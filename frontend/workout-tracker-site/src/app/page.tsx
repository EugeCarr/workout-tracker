"use server"
import Image from "next/image";
import "./styles.css";
import  SiteBanner from "./components/SiteBanner"
import { MainpageCard } from "./components/MainpageCard";


const Home = () => {
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
      >

      </MainpageCard>
      <MainpageCard
        title="Exercise Library"
        photoSrc="https://t3.ftcdn.net/jpg/02/65/07/74/360_F_265077477_ZGCVj8sIdqcwSjiAAYYap6AY0ukgdry3.jpg"
        description="Read and create different movements to put in your plans"
        pageRoute="/exerciseLibrary"
      >

      </MainpageCard>
    </div>
  );
}

export default Home;