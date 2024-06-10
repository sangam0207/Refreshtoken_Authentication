const {cricketers}=require('../data');

const dashboardData=(req,res)=>{
    res.json({cricketers})
}
const PlayerList=(req,res)=>{
    const cricketers = [
        "Sachin Tendulkar",  
        "Don Bradman",        
        "Brian Lara",          
        "Jacques Kallis",      
        "Wasim Akram",         
        "Ricky Ponting",       
        "Muttiah Muralitharan",
        "Vivian Richards",     
        "Imran Khan"           
      ];
      res.json({cricketers})
      
}
module.exports={dashboardData,PlayerList}


