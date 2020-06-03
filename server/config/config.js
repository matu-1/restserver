//puerto
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';   //NODE_ENV lo establece heroku

//seed de aunteticacion (token secret )
process.env.SEED = process.env.SEED || 'seed-desarrollo';

//vencimiento token       ( 60 -> seg, 60 -> min, 24 -> h, 60 -> dias)
process.env.VENCIMIENTO_TOKEN = 60 * 60 * 24 * 30;

//google client-id
process.env.CLIENT_ID = process.env.CLIENT_ID || '685065857311-ah1i9c32s810fkjht1n55mhdd7f01ve0.apps.googleusercontent.com'

//base de datos
if(process.env.NODE_ENV == 'dev') {
  process.env.URL_DB = 'mongodb://localhost:27017/cafedb'
}else{
  process.env.URL_DB = process.env.URL_REMOTE_DB;
}
