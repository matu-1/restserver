//puerto
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';   //NODE_ENV lo establece heroku

//base de datos
if(process.env.NODE_ENV == 'dev') {
  process.env.URL_DB = 'mongodb://localhost:27017/cafedb'
}else{
  process.env.URL_DB = process.env.URL_REMOTE_DB;
}
