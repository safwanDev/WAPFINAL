window.onload = function () {

    const user = getSessionStorage();

    hideShowControls(user);

    fetchSongs();

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


        if (length === 0) {


            console.log('Object is empty.');
            document.getElementById("errorMsg").innerText = "Incorrect User/Pasword";

        }
        else {

            setSessionStorage(result);
            hideShowControls(result);

        }
    }

    // for fetching songs

    async function fetchSongs() {
        let songList = await fetch('http://localhost:8000/songs/getsongs', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then(res => res.json());
        songList.forEach(song => renderSong(song));
    }

    function renderSong(song) {


        var table = document.getElementById('table')

        var row = `<tr>
							<td> ${song.id}</td>
							<td>${song.song}</td>
							<td>${song.artist}</td>
                            <td><img src="./public/assets/images/play.png" id="icon"></td>
                            <td> <button id="add">add</button></td>
                            <audio id="mySong" src="${song.url}" type="audio/mp3"></audio>
                            </tr>`
        table.innerHTML += row
        
        let mySong = document.getElementById("mySong");
        var icon = document.getElementById("icon");
        icon.onclick = function () {
    
            if (mySong.paused) {
                mySong.play();
                icon.src = "./public/assets/images/pause.png";
    
            }
            else {
                mySong.pause();
                icon.src = "./public/assets/images/play.png"
    
            }
        }
    


            
        

    }
     
    
   


    // const div = document.createElement('div');

    // div.classList = 'col-lg-12';
    // const firstDiv = document.createElement('div');
    // firstDiv.classList = 'col-lg-3';
    // firstDiv.innerText = song.id;

    // const SecondDiv = document.createElement('div');
    // SecondDiv.classList = 'col-lg-3';
    // SecondDiv.innerText = song.song;

    // const thirdDiv = document.createElement('div');
    // thirdDiv.classList = 'col-lg-3';
    // thirdDiv.innerText = song.artist;


    // div.appendChild(firstDiv);
    // div.appendChild(SecondDiv);
    // div.appendChild(thirdDiv);

    // document.getElementById("div-songs").appendChild(div);

    // const actions = document.createElement('p');
    // const updateBtn = document.createElement('a');
    // updateBtn.classList = 'btn btn-secondary';
    // updateBtn.textContent = 'UPDATE';
    // updateBtn.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     document.getElementById('product-heading').textContent = 'Edit Product';
    //     document.getElementById('title').value = prod.title;
    //     document.getElementById('isbn').value = prod.isbn;
    //     document.getElementById('publishedDate').value = prod.publishedDate;
    //     document.getElementById('author').value = prod.author;
    //     document.getElementById('product-btn').dataset.id = prod.id;
    // });



    function hideShowControls(data) {



        if (data) {
            document.getElementById("section").style.display = 'none';
            document.getElementById("section1").style.display = 'block';
            document.getElementById("user-form").style.display = 'none';
            document.getElementById("logout").style.display = 'block';

        }
        else {
            hide();
        }
    }

    document.getElementById("logout").onclick = function (event) {

        sessionStorage.removeItem("userDetails");
        hide();

    }
    function hide() {

        document.getElementById("section").style.display = 'block';
        document.getElementById("section1").style.display = 'none';

        document.getElementById("user-form").style.display = 'block';

        let logbtn = document.getElementById("logout").style.display = 'none';
    }


    function setSessionStorage(item) {

        sessionStorage.setItem('userDetails', JSON.stringify(item));

    }

    function getSessionStorage() {

        const response = sessionStorage.getItem('userDetails');

        return JSON.parse(response);

    }



    document.getElementById("submit").onclick = function () {
        checkUser();
        console.log("welcome");
    }

}


