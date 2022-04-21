const list = [
  {
    "id": "0001",
    "url": "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3  ",
    "song": "intrumental",
    "artist": "khalifa"
  },
  {
    "id": "0002",
    "url": "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3 ",
    "song": "beats",
    "artist": "wiz"
  },
  {
    "id": "0003",
    "url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3 ",
    "song": "hiphop",
    "artist": "2pac"
  },


];
const myCollection = [];


module.exports = class track {

  static getsongs() {
    return list;
  }
  static deleteId(sid, uid) {
    const index = myCollection.findIndex(p => p.userId == uid);
    return index > -1 ? myCollection[index].mySong = myCollection[index].mySong.filter(p => p.id != sid) : error("Not Found");
  }

  static addSong(data) {
    const index = myCollection.findIndex(p => p.userId == data.userid);
    if (index > -1) {
      const ownSong = list.find(l => l.id == data.id);
      myCollection[index].mySong.push(ownSong);
    } else {
      const ownSong = list.filter(song => song.id == data.id);
      myCollection.push({ userId: data.userid, mySong: ownSong });
    }
    return myCollection;
  }


  static fetchPlayList(userId) {

    const index = myCollection.findIndex(p => p.userId == userId);
    //console.log("ferc ", myCollection);
    //console.log("index ", index);

    if (index > -1)
      return myCollection.find(item => item.userId == userId);
  }
}
function error(e) {
  throw new error(e);


}