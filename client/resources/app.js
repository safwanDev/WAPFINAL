

window.onload = function () {
    let songList = [];
    let ownplaylist = [];
    //Check For User Validation
    async function checkUser() {
        let result = await fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('user').value,
                password: document.getElementById('pass').value
            })
        }).then(res => res.json());

        let length = Object.keys(result).length; //0

        //If User Not valid show error User not Found
        if (length === 0) {
            console.log('Object is empty.');
            document.getElementById("errorMsg").innerText = "Incorrect User/Pasword";

        }
        //    If User is Valid then set results and show content you want and hide        
        else {

            setSessionStorage(result);
            ShowContent(result);

        }
    }
    //check on reload for the session
    const user = getSessionStorage();
    ShowContent(user);
    //CONTENT YOU WANT TO SEE AFTER CHECKING SESSION 
    function ShowContent(data) {
        if (data) {
            document.getElementById("section").style.display = 'none';
            document.getElementById("section1").style.display = 'block';
            document.getElementById("user-form").style.display = 'none';
            document.getElementById("logout").style.display = 'block';
            document.getElementById("center").style.display = 'block';
            document.getElementById("footer").style.display = 'block';
            //AFTER YOU GOT THE SESSION IN GET PLAYLIST           
            getPlaylist();
        }
        else {
            // SESSION invalid HIDE CONTENT  
            hide();
        }
    }
    //Then Fetch Songs From the Server
    fetchSongs();

    // for fetching songs
    async function fetchSongs() {
        songList = await fetch('http://localhost:8000/songs/allsongs', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then(res => res.json());

        songList.forEach(song => renderSong(song));
        // ADD SONG TO SERVER AND FETCH TO CLIENT
        addbtn(songList);
    }
    function addbtn(songList) {
        for (let i = 0; i < songList.length; ++i) {
            let addbutton = document.getElementById("add" + songList[i].id);
            addbutton.style.cursor = "pointer";
            addbutton.addEventListener('click', function (event) {

                event.preventDefault();
                const songpointer = songList.find((e) => e.id == songList[i].id);

                const index = ownplaylist.findIndex(item => item.id == songList[i].id);
                if (index < 0) {

                    ownplaylist.push(songpointer);
                    //addsong on in servre playlist
                    addSongInServerPlaylist(songpointer);
                    //Rendering playlist in client                       
                    PopulatingPlayList(songpointer);
                    //BINDING EACH BUTTON
                    for (let i = 0; i < ownplaylist.length; i++) {

                        remove(ownplaylist[i]);
                        bindPlayEvent(ownplaylist[i]);
                    }

                }

            });
        }
    }


    //   getplayList OF USER FROM SERVER
    async function getPlaylist() {
        let res = await fetch('http://localhost:8000/songs/' + user.id + '/MySongs', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },

        }

        ).then(response => response.json());

        // IF THE RESPONSE HAVE SONGS THEN RENDER IT ON CLIENT THROUGH POPULATINGPLAY LIST
        if (res && res.mySong && res.mySong.length > 0) {
            ownplaylist = res.mySong;
            ownplaylist.forEach(song => PopulatingPlayList(song));


            for (let i = 0; i < ownplaylist.length; i++) {

                remove(ownplaylist[i]);
                bindPlayEvent(ownplaylist[i]);
            }

        }
    }


    function remove(data) {


        let removebtn = document.getElementById("remove" + data.id);
        removebtn.style.cursor = "pointer";
        removebtn.addEventListener('click', async function (event) {
            event.preventDefault();
            alert('Are you sure you want to delete song from playlist');
            let result = await fetch('http://localhost:8000/songs/' + data.id + '/' + user.id + '/deletesong', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            }

            ).then(response => response);
            if (result) {

                location.reload();

            }

        });


    }

    //display playlist on client
    function PopulatingPlayList(item) {
        var table = document.getElementById('table1');
        var row = `<tr id="song${item.id}">
							<td> ${item.id}</td>
							<td>${item.song}</td>
                          <td><img src="./public/assets/images/play.png" id="icon${item.id}"></td>
                          <td><button id="remove${item.id}"> Remove </button></td> 
                            <audio id="mySong${item.id}" src="${item.url}" type="audio/mp3"></audio>
                            </tr>`
        table.innerHTML += row



    }
    //play button bind=======================================
    function bindPlayEvent(item) {

        let mySong = document.getElementById("mySong" + item.id);
        var icon = document.getElementById("icon" + item.id);
        icon.style.cursor = "pointer"
        icon.addEventListener('click', function (event) {
            // document.getElementById("musicPlayer").src = item.url;

            if (mySong.paused) {
                mySong.play();
                // mySong.pause();

                icon.src = "./public/assets/images/pause.png";

            }
            else {
                mySong.pause();
                icon.src = "./public/assets/images/play.png"

            }
        });

    }

    // rendering song on client
    function renderSong(song) {


        var table = document.getElementById('table')

        var row = `<tr id="song${song.id}">
							<td> ${song.id}</td>
							<td>${song.song}</td>
							<td>${song.artist}</td>
                
                            <td> <button id="add${song.id}">add</button></td>
                           
                            </tr>`
        table.innerHTML += row
    }

    async function addSongInServerPlaylist(song) {
        let result = await fetch('http://localhost:8000/songs/addInPlaylist', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },

            body: JSON.stringify({

                userid: user.id,
                id: song.id,
            })

        }).then(res => res.json());

    }


    document.getElementById("logout").onclick = function (event) {

        sessionStorage.removeItem("Token");
        document.getElementById("table1").innerHTML = "";
        hide();

    }
    function hide() {

        document.getElementById("section").style.display = 'block';
        document.getElementById("section1").style.display = 'none';

        document.getElementById("user-form").style.display = 'block';

        let logbtn = document.getElementById("logout").style.display = 'none';
        document.getElementById("center").style.display = 'none';

    }


    function setSessionStorage(item) {

        sessionStorage.setItem('Token', JSON.stringify(item));

    }
    // 
    function getSessionStorage() {
        const response = sessionStorage.getItem('Token');
        return JSON.parse(response);
    }
    document.getElementById("submit").onclick = function () {
        checkUser();
    }
// SEARCH BUTTON
    document.getElementById('searchbtn').onclick = function (event) {
        document.getElementById("searchMsg").innerText = '';
        let searchString = document.getElementById('search').value;
        const allsongs = songList.filter(s => s.song.toLowerCase().includes(searchString.toLowerCase()));
        if (allsongs.length == 0 || searchString == null || searchString == "") {
        }
        else {
            for (let i = 0; i < allsongs.length; i++) {
                var table = document.getElementById('table')
                table.innerHTML = "";

                var row = `<tr id="song${allsongs[i].id}">
                                    <td> ${allsongs[i].id}</td>
                                    <td>${allsongs[i].song}</td>
                                    <td>${allsongs[i].artist}</td>
                        
                                    <td> <button id="add${allsongs[i].id}">add</button></td>
                                   
                                    </tr>`
                table.innerHTML += row
                addbtn(allsongs);
            }

        }

        event.preventDefault();
    }
       var whichsong=0;
       let mp= document.getElementById("musicPlayer")
      document.getElementById("next").onclick=function () {
        $("#musicPlayer")[0].pause();
        $("#musicPlayer")[0].src = '';
             whichsong++;
        if (whichsong == ownplaylist.length) {
            whichsong = 0;
        }
        $("#musicPlayer")[0].src = ownplaylist[whichsong].url;
        if (play) {
            $("#musicPlayer")[0].play();
        }
    }
    document.getElementById("previous").onclick=function () {
      $("#musicPlayer")[0].pause();
      $("#musicPlayer")[0].src = '';
           whichsong--;
      if (whichsong == ownplaylist.length) {
          whichsong = 0;
      }
      $("#musicPlayer")[0].src = ownplaylist[whichsong].url;
      if (play) {
          $("#musicPlayer")[0].play();
      }
  }
    


    // $("#prev-bt").click(function () {
    //     $("#audio-player")[0].pause();
    //     $("#audio-player")[0].src = '';
    //     whichsong++;
    //     if (whichsong == treeObj.root.length) {
    //         whichsong = 0;
    //     }
    //     $("#audio-player")[0].src = treeObj.root[whichsong];
    //     if (playing) {
    //         $("#audio-player")[0].play();
    //     }
    // })







}


