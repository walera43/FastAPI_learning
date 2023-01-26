import databases
import sqlalchemy
import ormar

metadata = sqlalchemy.MetaData()
database = databases.Database("sqlite:///test.db")
engine = sqlalchemy.create_engine("sqlite:///test.db")


class MainMeta(ormar.ModelMeta):
    metadata = metadata
    database = database