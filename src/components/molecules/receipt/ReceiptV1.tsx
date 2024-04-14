import logo from "@/assets/img/logo.svg";
import filigrane from "@/assets/img/filigranes.svg";
import userImage from "@/assets/img/bruce-mars.jpeg";
import star from "@/assets/img/star.svg";
import Card from "@/entities/studentCard.entity";
import { formatDateBySlash } from "@/utils";
import QrCodeGenerator from "@/components/Qrgenerator";

type Props = {
  card: Card;
};

export default function ReceiptV1({ card }: Props) {
  // Handlers
  const formatCode = (code: string) => {
    const codeArray = code.split("");
    console.log(codeArray.slice(1));

    const result = codeArray.slice(1).map((char, index) => {
      if (index % 3 === 0 && index !== 0) {
        return `-${char}`;
      }
      return char;
    });

    return codeArray[0] + "-" + result.join("");
  };

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
            <p className="text-[8px]">RÉPUBLIQUE DU CAMEROUN</p>
            <p className="text-[8px]">Paix - Travail - Patrie</p>
            <p className="text-[8px]">UNIVERSIT" DE YAOUNDE 1</p>
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
      <div className="w-full h-[15%] flex items-center text-lg py-[0.3rem] font-nunitoBold bg-[#BA68C8] leading-[8px]">
        <p className="h-1/2 w-full text-center">
          <span className="text-black font-nunitoBold text-[10px]">
            RÉCÉPISSÉ CARTE D’ETUDIANT
          </span>
        </p>
      </div>
      <div className="w-full h-[60%] bg-primary p-2 pb-0 rounded-b">
        <div className="h-[35%]">
          <p className="font-nunitoBold text-white line-clamp-2 text-[12px] uppercase">
            {card.name}
          </p>
          <hr className="w-[30%] bg-purple-400 border-[#BA68C8]" />
        </div>
        <div className="h-[65%] w-full flex items-center justify-between">
          <div className="w-[70px] h-[90%] rounded-2xl border-2 border-primary overflow-hidden">
            <img
              src={userImage}
              className="w-full h-full object-cover"
              alt="Student image"
            />
          </div>
          <div className="text-white text-sm font-nunitoRegular ">
            <p>Code numérique</p>
            <p>{formatCode(card.code)}</p>
          </div>
          {/* QRcode */}
          <div className="border h-[90%] bg-white">
            <QrCodeGenerator code={card.code} height={65} width={65} />
          </div>
        </div>
      </div>
      <div className="absolute w-[50%] h-full top-0 left-[25%]">
        <img
          src={filigrane}
          className="w-full h-full object-fill"
          alt="University of Yaounde 1 logo"
        />
      </div>
    </div>
  );
}
