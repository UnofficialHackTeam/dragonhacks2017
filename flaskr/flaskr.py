# -*- coding: utf-8 -*-
"""
    Flaskr
    ~~~~~~

    A microblog example application written as Flask tutorial with
    Flask and sqlite3.

    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""

import os
from sqlite3 import dbapi2 as sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, jsonify
from flask import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base




# create our little application :)
from sqlalchemy import *

app = Flask(__name__)

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE='sqlite:///dragonhack.db',
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dragonhack.db',
    DEBUG=True,
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

def connect_db():
    db = create_engine(app.config['DATABASE'])
    return db

def get_db():
    # if not hasattr(g, 'sqlite_db'):
    #     g.sqlite_db = connect_db()
    return connect_db()


engine = get_db()
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

Session = sessionmaker(autoflush=False, bind=engine)
Session.configure(bind=engine)
db = SQLAlchemy(app)

class Location(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    evntype = db.Column(db.String(64))
    title = db.Column(db.String(64))
    desc = db.Column(db.String(64))
    timestamp = db.Column(db.String(64))


    def __init__(self, latitude, longitude, evntype, title, desc, timestamp):
        self.latitude = latitude
        self.longitude = longitude
        self.evntype = evntype
        self.title = title
        self.desc = desc
        self.timestamp = timestamp

    def __repr__(self):
        return '<Location UID:%r LATITUDE:%r LONGITUDE:%r evntype:%r desc:%r title:%r desc:%r timestamp:%r parent_id:%r>' % \
               (self.uid, self.latitude, self.longitude,  self.evntype, self.desc, self.title, self.desc, self.timestamp, self.parent_id)




@app.route('/test1/')
def testing():

    db.create_all()

    test1 = Location(2.333,3.444,"envt", "title", "desc", "TIME")
    test2 = Location(2.111,3.2,"envt2", "title2", "desc", "TIME")

    db.session.add(test1)
    db.session.add(test2)
    db.session.commit()
    return "yep"

@app.route('/add', methods = ['POST'])
def test():
    # lat = request.json['latitude']
    # lon = request.json['longitude']
    # temp = Location(lat, lon)
    # db.session.add(temp)
    # db.session.commit()
    return "test"

# @app.route('/get/<uid>', methods = ['GET'])
# def test(uid):
#     # temp = db.
#     return "kljkj"
#     # lat = request.json['latitude']
#     # lon = request.json['longitude']
#     # temp = Location(1, lat, lon)
#     # db.session.add(temp)
#     # db.session.commit()

@app.route('/test2/')
def testin():
    admin = Location.query.all()
    return "tsdg"

#Adds a random latitude and longitude to the database
# @app.route('/add')
# def add_entry():
#     db = get_db()
#     purchases= (1.222,3.4444,"2017-09-02 04:05:06.333")
#     db.execute('INSERT INTO Location_Records (Latitude, Longitude, Timestamp) values (?, ?, ?)', purchases)
#     db.commit()
#     return "test"
# #    flash('New entry was successfully posted')
# #    return redirect(url_for('show_entries'))
#
@app.route('/wipe')
def wipe_table():

    return "Wiped"

#
# @app.route('/test', methods = ['GET', 'POST', 'DELETE'])
# def test():
#     # name = request.
#     db = create_engine('sqlite:///dragonhack.db')
#     metadata = MetaData()
#     inspector = inspect(db)
#     user = Table('location', metadata,
#                  Column('uid', Integer, primary_key=True),
#                  Column('lat', Float, nullable=False),
#                  Column('lon', Float, nullable=False),
#                  Column('cat', String(16), nullable=False),
#                  # Column('email_address', String(60)),
#                  # Column('password', String(20), nullable=False)
#                  )
#

#     temp = 0
#     for table_name in inspector.get_table_names():
#         for column in inspector.get_columns(table_name):
#             temp = column['name']
#     return temp
#
#
# def connect_db():
#     """Connects to the specific database."""
#     rv = sqlite3.connect(app.config['DATABASE'])
#     rv.row_factory = sqlite3.Row
#     return rv
#
#
# def init_db():
#     """Initializes the database."""
#     db = get_db()
#     with app.open_resource('schema.sql', mode='r') as f:
#         db.cursor().executescript(f.read())
#     db.commit()
#
#
# @app.cli.command('initdb')
# def initdb_command():
#     """Creates the database tables."""
#     init_db()
#     print('Initialized the database.')
#
#
# def get_db():
#     """Opens a new database connection if there is none yet for the
#     current application context.
#     """
#     if not hasattr(g, 'sqlite_db'):
#         g.sqlite_db = connect_db()
#     return g.sqlite_db
#
#
@app.teardown_appcontext
def close_db(error):
        db_session.remove()

@app.route('/')
def index():
    return render_template('index.html')

def init_db():
    Base.metadata.create_all(bind=engine)

# @app.route('/')
# def show_entries():
#     db = get_db()
#     cur = db.execute('select title, text from entries order by id desc')
#     entries = cur.fetchall()
#     return render_template('show_entries.html', entries=entries)


# @app.route('/add', methods=['POST'])
# def add_entry():
#     if not session.get('logged_in'):
#         abort(401)
#     db = get_db()
#     db.execute('insert into entries (title, text) values (?, ?)',
#                [request.form['title'], request.form['text']])
#     db.commit()
#     flash('New entry was successfully posted')
#     return redirect(url_for('show_entries'))


# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     error = None
#     if request.method == 'POST':
#         if request.form['username'] != app.config['USERNAME']:
#             error = 'Invalid username'
#         elif request.form['password'] != app.config['PASSWORD']:
#             error = 'Invalid password'
#         else:
#             session['logged_in'] = True
#             flash('You were logged in')
#             return redirect(url_for('show_entries'))
#     return render_template('login.html', error=error)


# @app.route('/logout')
# def logout():
#     session.pop('logged_in', None)
#     flash('You were logged out')
#     return redirect(url_for('show_entries'))




if __name__ == '__main__':
    app.run(host='0.0.0.0')