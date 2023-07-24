import { BsThreeDots } from "react-icons/bs";
import React, { useEffect } from "react";
import VectorCard from "../assets/Vector.png";
import ChangeVectore from "../assets/vect.png";
interface Props {
  card: any;
}
const IslamicCards = ({ card }: Props) => {
  useEffect(() => {}, [card]);

  return (
    <div className="cardContainer">
      <div className="cardfirstDiv">
        <img
          src={card.type == "Dua" ? ChangeVectore : VectorCard}
          className="cardImageIcon"
        />
        <BsThreeDots size={24} color="#03AA77" style={{ background: "#fff" }} />
      </div>
      <div className="cardContent">
        <h1 className="hadithtitle">
          {card.type == "Dua" ? "Dua in Arabic" : card.name}
        </h1>
        <p className="hadith">{card?.text}</p>
      </div>
    </div>
  );
};

export default IslamicCards;
