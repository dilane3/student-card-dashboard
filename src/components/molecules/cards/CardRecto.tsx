import logo from "@/assets/img/logo.svg";
import logoTransparent from "@/assets/img/logo_transparent.png";
import userImage from "@/assets/img/bruce-mars.jpeg";
import star from "@/assets/img/star.svg";
import Card from "@/entities/studentCard.entity";
import { formatDateBySlash } from "@/utils";

type Props = {
  card: Card
}

export default function CardRector({ card }: Props) {
  return (
    <div className="w-card h-card relative bg-neutral-100 border-2 border-primary bg-gray-100 rounded-2xl overflow-hidden">
      <div className="w-full h-[25%] bg-primary bg-opacity-60">
        <div className="flex bg-primary justify-center items-center h-[10%] w-full">
          <div className="w-[40%] h-[50%] flex">
            <div className="w-1/3 bg-[#6DAD9D]" />
            <div className="w-1/3 bg-[#E8766E] flex justify-center items-center">
              <img src={star} alt="Yellow star" className="w-full h-full" />
            </div>
            <div className="w-1/3 bg-[#FAE24C]" />
          </div>
        </div>
        <div className="flex w-full h-[90%] bg-primary">
          <div className="w-[40%] text-white h-full font-gideonRomanRegular flex flex-col justify-center items-center">
            <p className="text-[8px]">REPUBLIQUE DU CAMEROUN</p>
            <p className="text-[8px]">Paix - Travail - Patrie</p>
            <p className="text-[8px]">UNIVERSITE DE YAOUNDE 1</p>
          </div>
          <div className="w-[20%] h-full flex justify-center items-center">
            <img src={logo} className="w-full h-full" alt="UY1 transparent logo" />
          </div>
          <div className="w-[40%] h-full font-gideonRomanRegular text-white flex flex-col justify-center items-center">
            <p className="text-[8px]">REPUBLIC OF CAMEROON</p>
            <p className="text-[8px]">Peace - Work - Fatherland</p>
            <p className="text-[8px]">UNIVERSITY OF YAOUNDE 1</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[15%] text-lg py-[0.3rem] font-nunitoBold bg-[#BA68C8] leading-[8px]">
        <p className="h-1/2 w-full text-center text-[10px]">
          CARTE D’ÉTUDIANT - FACULTE DES SCIENCES
        </p>
        <p className="h-1/2 w-full text-center">
          <span className="text-white font-nunitoBoldItalic text-[10px]">FILIÈRE/OPTION:</span>
          <span className="text-[10px] uppercase">{` ${card.sector}`}</span>
        </p>
      </div>
      <div className="w-full h-[60%] flex bg-white p-2 pb-0 rounded-b-2xl">
        <div className="h-full w-[78%]">
          <div className="h-1/3 font-nunitoBoldItalic text-primary flex w-full">
            <div className="w-2/6 mr-2 h-full">
              <p className="w-full text-[8px]">NOM/SURNAME</p>
              <p className="font-nunitoBold text-black overflow-clip text-ellipsis text-[8px] uppercase">
                {card.firstName}
              </p>
            </div>
            <div className="w-3/6 mr-2 h-full">
              <p className="w-full text-[8px]">PRÉNOMS/GIVEN NAMES</p>
              <p className="font-nunitoBold text-black text-[8px] uppercase">{card.lastName}</p>
            </div>
            <div className="w-1/6 h-full">
              <p className="w-full text-[8px]">SEXE/SEX</p>
              <p className="font-nunitoBold text-black text-[8px] uppercase">{card.sex}</p>
            </div>
          </div>
          <div className="h-1/3 font-nunitoBoldItalic text-primary w-full leading-[10px]">
            <p className="w-full text-[8px]">
              DATE ET LIEU DE NAISSANCE/DATE AND PLACE OF BIRTH
            </p>
            <p className="w-full">
              <span className="w-full h-full font-nunitoBold text-[8px] text-black">
                {formatDateBySlash(card.birthDate)}
              </span>
              <span className="mx-4 text-[8px]">À/AT</span>
              <span className="w-full h-full font-nunitoBold text-black text-[8px] uppercase">
                {card.birthPlace}
              </span>
            </p>
          </div>
          <div className="h-1/3 font-nunitoBoldItalic text-primary flex w-full">
            <div className="w-1/2 h-full mr-2">
              <p className="text-[8px]">NATIONALITÉ/NATIONALITY</p>
              <p className="font-nunitoBold text-black text-[8px]">CAMEROUNAIS</p>
            </div>
            <div className="w-1/2 h-full">
              <p className="text-[8px]">ANNÉE/ACADEMIC YEAR</p>
              <p className="font-nunitoBold text-black text-[8px]">2023-2024</p>
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col justify-end items-center pb-4 w-[22%]">
          <div className="w-[60px] h-[60px] rounded-2xl border-2 border-primary overflow-hidden">
            <img
              src={card.avatarLink}
              className="w-full h-full object-cover"
              alt="Student image"
            />
          </div>
          <p className="w-full text-center font-nunitoBold text-black text-[8px] mt-2 uppercase">
            MAT: {card.matricule}
          </p>
        </div>
      </div>
      <div className="absolute w-[50%] h-full top-0 left-0">
        <img
          src={logoTransparent}
          className="w-full h-full object-fill opacity-[0.1]"
          alt="University of Yaounde 1 logo"
        />
      </div>
    </div>
  );
}
