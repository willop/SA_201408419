import './App.css';
import { React, useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [pokemon, setpokemon] = useState([
  ])

  const [searchpokemon, setsearchpokemon] = useState({
    nombre: '',
    imagen: ''
});

  //Realizar consulta
  function ViewLogs(x) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${x}`)
      .then((res) => res.json())
      .then((data) => {
        var name = data.name
        var url = data.sprites.other.dream_world.front_default
        //pokemon.push({ name, url })
        setpokemon(arr => [...arr, { name, url }])
      });
    //.then((data)=> setpokemon(ndata.name,url:data.sprites.other.dream_world.front_default ));
  }

  //consultar un pokemon
  const searchh = async () => {
    console.log("click")
    try {
      let configuration = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
      let respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/'+searchpokemon.nombre , configuration)
      let json = await respuesta.json();
      var img =json.sprites.other.dream_world.front_default
      searchpokemon.imagen = img
      //console.log(searchpokemon)
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleoperacion = (evnt) => {
    searchpokemon.nombre = evnt.target.value;
  }


  useEffect(() => {
    var x = 152;
    while (x <= 300) {
      ViewLogs(x);
      x++;
    }
  }, []);

  return (
    <div className="App">
      <br />
      <br />
      <center><h1>POKEMON</h1></center>
      <br />
      <br />
      <div id="Formulario">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Buscar un pokemon</Form.Label>
            <Form.Control type="text" onChange={handleoperacion} placeholder="Ingrese el pokemon" />
            <br />
            <center><Button onClick={searchh}>Buscar pokemon</Button></center>
          </Form.Group>
        </Form>
        <br /><br />
          {
            (searchpokemon.imagen == "" ? <div></div> : <div><center>
            <Card style={{ width: '18rem' }}>
              <Card.Img  variant="top" src={searchpokemon.imagen}/>
              <Card.Body>
                <center><Card.Title> {searchpokemon.nombre} </Card.Title></center>
              </Card.Body>
            </Card>
            </center></div>
            )
          }
          
      </div>
      <br />
      <br />
      <div id="pokecards">
        {
          pokemon.map((indexpoke, index) => {
            return (
              <div key={index} id="card_poke">
                <Card id="card" style={{ width: '18rem' }}>
                  <Card.Img id="card_img" variant="top" src={indexpoke.url} />
                  <Card.Body>
                    <center><Card.Title>{indexpoke.name}</Card.Title></center>
                  </Card.Body>
                </Card>
                <br />
                <br />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
