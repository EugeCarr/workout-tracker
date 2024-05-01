"use client"
import Image from "next/image";
import "./styles.css";
import  SiteBanner from "./components/SiteBanner"
import { MainpageCard } from "./components/MainpageCard";
import { useEffect, useState } from "react";
import { userAccount } from "./interfaces/interfaces";
import { myFetch } from "./api/fetchWrapper";
import { SITE_DOMAIN_NAME } from "./config";


const Home = () => {
  const [myUser, setMyUser] = useState<userAccount>({} as userAccount);

  useEffect(
    () => {
      const getMyUser = async () : Promise<void> => {
        const myUserBody = await myFetch(
          `/api/getLoggedInUser`,
          {}
      );   
        // const myUserBody = await myUserRes.json();
        setMyUser(myUserBody);
        return
      } 
      getMyUser();
      return
    }, []
  );
  const isUserTrainer = myUser?.groups?.includes("Trainer");

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
        photoSrc="https://cdn1.vectorstock.com/i/thumb-large/35/50/stick-figure-man-lifts-heavy-barbell-over-his-vector-38013550.jpg"
        description="Create and edit workouts for clients and trainers."
        pageRoute="/myWorkouts"
        altText="Photo of stick man working out"
      />
      {
        isUserTrainer &&
          <MainpageCard
          title="Manage Clients"
          photoSrc='https://d3n8a8pro7vhmx.cloudfront.net/righttoresearch/pages/1087/attachments/original/1476386726/Meetup_Icons-traditionalmt-06.png?1476386726'
          description="View and create Clients for the Workout Tracker."
          pageRoute="/manageClients"
          altText="Clients"
        />
      }
      <MainpageCard
        title="Exercise Library"
        photoSrc="https://t3.ftcdn.net/jpg/02/65/07/74/360_F_265077477_ZGCVj8sIdqcwSjiAAYYap6AY0ukgdry3.jpg"
        description="Read and create different movements to put in your plans"
        pageRoute="/exerciseLibrary"
        altText="Picture of many simplified exercises"
      />
    </div>
  );
}

export default Home;