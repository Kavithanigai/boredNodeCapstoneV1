if(process.env.NODE_ENV === 'production'){
  module.exports ={mongoURI:'mongodb://kavi:Srilakshmi7@ds133920.mlab.com:33920/riddlesprod'}
}else {
  module.exports={mongoURI:'mongodb://localhost/riddles-dev'}
}
