const os = require('os');
const fs = require('fs');

const datta = () => {
	now = new Date
   h = now.getHours()
   mi = now.getMinutes() 
   s = now.getSeconds()
   d = now.getDate() 
   mo = now.getMonth()+1
   y = now.getFullYear()
   ret = `[${d}/${mo}  ${h}:${mi}:${s}]`
   return ret
}

 
//memory of the system
const memFreePorcent = (100*(os.freemem()/os.totalmem())).toFixed(2)

//ip
ip = 'localhost'
 var ifaces = os.networkInterfaces(); 
 Object.keys(ifaces).forEach(function (ifname) { var alias = 0;
 	 ifaces[ifname].forEach(function (iface) { if ('IPv4' !== iface.family || iface.internal !== false)
 	 	 { // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
 	 	  return;
 	 	  }
 	 	    if (alias >= 1) { // this single interface has multiple ipv4 addresses 
 	 	       //  console.log(ifname + ':' + alias, iface.address);
 	 	         ip = iface.address 
 	 	  }
	     else { //this interface has only one ipv4 adress 
	        //console.log(ifname, iface.address);
	        ip = iface.address
	         } 
	     ++alias;
	      });
	    }); 
const myIp = ip
//console.log(myIp)

//const log = require(`./logger`)

const log = (l) => {
	text =  datta()+': '+l+'\n'
	if(fs.existsSync('public/')){
		fs.writeFile('./public/log', text, {enconding:'utf-8', flag:'a+'}, (err) => {
	  }) 
	 }
  else{
        fs.writeFile('./public/log', text, {enconding:'utf-8', flag:'a+'}, (err) => {
    })
    }

    console.log(text)
}


time = {
	t : 0,
	init : function(){
		this.t = Date.now();
	},
	end : function(){
		let tf = Date.now() - this.t;
		return tf
		}
    }


//test
class Fun{
	constructor(s){
		this.s = s;
	}
	test(){
		try{
			eval(this.s)
		}
		catch(e){
			console.error(e)
		}
	}
}





//console.log(os)


//test	

//time.init()
//function on(){
	//log('on')
//log(time.end())


console.log(datta)
module.exports = {log, time, myIp, memFreePorcent, datta}
    
