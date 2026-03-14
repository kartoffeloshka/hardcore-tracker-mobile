import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function App() {

  const [exercise,setExercise] = useState("");
  const [weight,setWeight] = useState("");
  const [reps,setReps] = useState("");
  const [history,setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get(`${API}/api/workouts`);
    setHistory(res.data.slice(0,5));
  };

  useEffect(()=>{
    fetchHistory();
  },[]);

  const logSet = async () => {

    const workout = {
      exercises:[
        {
          name:exercise,
          sets:[
            {
              weight:Number(weight),
              reps:Number(reps)
            }
          ]
        }
      ]
    };

    await axios.post(`${API}/api/workouts`, workout);

    setWeight("");
    setReps("");

    alert("Set Logged 💪");

    fetchHistory();
  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>Strength Tracker</h1>

      <input
        style={styles.input}
        placeholder="Exercise"
        value={exercise}
        onChange={(e)=>setExercise(e.target.value)}
      />

      <input
        style={styles.number}
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e)=>setWeight(e.target.value)}
      />

      <input
        style={styles.number}
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e)=>setReps(e.target.value)}
      />

      <button style={styles.button} onClick={logSet}>
        Log Set
      </button>

      <h2 style={styles.subtitle}>Recent Sets</h2>

      {history.map((w,i)=>
        w.exercises.map((ex,j)=>
          ex.sets.map((s,k)=>(
            <div key={`${i}-${j}-${k}`} style={styles.card}>
              {ex.name} — {s.weight}kg x {s.reps}
            </div>
          ))
        )
      )}

    </div>
  );
}

const styles = {

container:{
background:"#000",
color:"#00ff7f",
minHeight:"100vh",
padding:"20px",
fontFamily:"sans-serif"
},

title:{
textAlign:"center"
},

subtitle:{
marginTop:"30px"
},

input:{
width:"100%",
padding:"15px",
marginTop:"10px",
fontSize:"18px",
background:"#111",
border:"1px solid #00ff7f",
color:"#00ff7f"
},

number:{
width:"100%",
padding:"20px",
marginTop:"10px",
fontSize:"28px",
textAlign:"center",
background:"#111",
border:"2px solid #00ff7f",
color:"#00ff7f"
},

button:{
width:"100%",
padding:"20px",
marginTop:"20px",
fontSize:"22px",
background:"#00ff7f",
color:"#000",
border:"none",
fontWeight:"bold"
},

card:{
background:"#111",
padding:"10px",
marginTop:"10px",
border:"1px solid #00ff7f"
}

};