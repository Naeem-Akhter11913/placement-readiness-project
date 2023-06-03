import React, { useEffect } from 'react'
import Graph from './Graph'
import { db, auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';

const Stats = (
  {
    wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missedChars,
    extraChars,
    graphData
  }
) => {

  let timeSet = new Set();
  const newGraph = graphData.filter(i => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushDataToDB = () => {
    if (isNaN(accuracy)) {
      toast.error('not able to save', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const resultRef = db.collection('result');
    const { uid } = auth.currentUser;

    resultRef.add({
      wpm: wpm,
      accuracy: accuracy,
      timeStamp: new Date(),
      character: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
      userId: uid
    }).then((res) => {
      toast.success('data saved in DB', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch((err) => {
      toast.error('not able to save', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }


  useEffect(() => {
    if (auth.currentUser) {
      pushDataToDB();
    } else {
      toast.warning('log in to data save in DB', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [])

  return (
    <div className='stats-box'>
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title">Characters</div>
        <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
      </div>
      <div className="right-stats">
        {/* graph will go here  */}
        <Graph graphData={newGraph} />
      </div>
    </div>
  )
}

export default Stats