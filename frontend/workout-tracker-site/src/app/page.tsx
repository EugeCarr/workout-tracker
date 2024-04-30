"use client"
import Image from "next/image";
import "./styles.css";
import  SiteBanner from "./components/SiteBanner"
import { MainpageCard } from "./components/MainpageCard";
import { useEffect, useState } from "react";
import { userAccount } from "./interfaces/interfaces";


const Home = () => {
  const [myUser, setMyUser] = useState<userAccount>({} as userAccount);

  useEffect(
    () => {
      const getMyUser = async () : Promise<void> => {
        const myUserRes = await fetch(
          `http://localhost:3000/api/getLoggedInUser`
      );   
      const myUserBody = await myUserRes.json();
      setMyUser(myUserBody);
      return
      } 
      getMyUser();
      return
    }, []
  );
  const isUserTrainer = myUser?.groups?.includes("Trainer");
  console.log({myUser, isUserTrainer})

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <MainpageCard
        title="Workout Plans"
        photoSrc="https://www.shutterstock.com/image-vector/weightlifting-dumbbell-training-icon-260nw-551668651.jpg"
        description="Create and edit workouts for clients and trainers."
        pageRoute="/myWorkouts"
      />
      {
        isUserTrainer &&
          <MainpageCard
          title="Manage Clients"
          photoSrc="https://t3.ftcdn.net/jpg/02/65/07/74/360_F_265077477_ZGCVj8sIdqcwSjiAAYYap6AY0ukgdry3.jpg"
          description="View and create Clients for the Workout Tracker."
          pageRoute="/manageClients"
        />
      }
      <MainpageCard
        title="Exercise Library"
        photoSrc="https://t3.ftcdn.net/jpg/02/65/07/74/360_F_265077477_ZGCVj8sIdqcwSjiAAYYap6AY0ukgdry3.jpg"
        description="Read and create different movements to put in your plans"
        pageRoute="/exerciseLibrary"
      />
    </div>
  );
}

export default Home;