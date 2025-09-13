import React from "react";
import OverView from "../../components/dashboard/overview/OverView.jsx";
import Income from "../../components/dashboard/income/Income.jsx";
import Expanse from "../../components/dashboard/expanse/Expanse.jsx";

const Dashboard = () => {
     return(
           <>
            <OverView/>
            <Expanse/>
            <Income/>
            
           </>
     )   
}

export default Dashboard;