const list= [
    {
      "id":"0001",
     "url":"http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3  ",
     "song": "intrumental",
     "artist":"khalifa"  
    },
    {
      "id":"0002",
     "url":"http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3 ",
     "song": "beats",
     "artist":"wiz"  
    },
    {
      "id":"0003",
     "url":"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3 ",
     "song": "hiphop",
     "artist":"2pac"  
    },
    
    
 ];


module.exports = class track{
 
static getsongs(){
  return list;


}



}