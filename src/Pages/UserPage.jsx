import React, { useEffect, useState } from 'react'
import { auth, db } from '../FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import TableUserData from '../Components/TableUserData'
import Graph from '../Components/Graph'
import UserInfo from '../Components/UserInfo'

const UserPage = () => {
  const [data, setData] = useState([])
  const [graphData, setGraphDta] = useState([])
  const [dataLoading,setDataLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  let temData = [];
  let tempGraphData = [];

  const fetchUserData = () => {
    const resultsRef = db.collection('result');
    const { uid } = auth.currentUser;

    resultsRef.where('userId', '==', uid).orderBy('timeStamp', 'desc').get().then((snamshot) => {
      snamshot.docs.forEach((doc) => {
        temData.push({ ...doc.data() })
        tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().wpm]);
      });
      setData(temData);
      setGraphDta(tempGraphData.reverse());
      setDataLoading(false)
    });
    // console.log(data)
  }

  useEffect(() => {
    if (!loading) {
      fetchUserData()
    }
    if (!loading && !user) {
      navigate('/')
    }
  }, [loading])


  if (loading ||dataLoading) {
    return <div className="center-of-screen">
      <CircularProgress size={300}/>
    </div>

  }

  return (
    <div className='canvas'>
      <UserInfo totalTestTaken={data.length} />
      <div className="graph-user-page">
        <Graph graphData={graphData} />
      </div>
      <TableUserData data={data} />
    </div>
  )
}

export default UserPage