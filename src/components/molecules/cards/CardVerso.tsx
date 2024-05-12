import QrCodeGenerator from "@/components/Qrgenerator";

import logoTransparent from "@/assets/img/logo_transparent.png";
import star from "@/assets/img/star.svg";
import signature from "@/assets/img/signature.png";
import Card from "@/entities/studentCard.entity";
import { formatDateBySlash } from "@/utils";

type Props = {
  card: Card
}

export default function CardVerso({ card }: Props) {
  // Handlers
  const formatCode = (code: string) => {
    const codeArray = code.split("");
    const result = codeArray.slice(1).map((char, index) => {
      if (index % 3 === 0 && index !== 0) {
        return ` ${char}`;
      }
      return char;
    });

    return codeArray[0] + ' ' + result.join("");
  }

  return (
    <div className="w-card h-card relative bg-neutral-100 border-2 border-primary bg-gray-100 rounded-2xl">
      <div className="w-full h-[56%] flex bg-white px-2 pt-3 pb-2 rounded-t-2xl">
        <div className="h-full w-[70%] text-black font-nunitoBold mr-4">
          <div className="h-1/3 flex w-full">
            <div className="w-full h-full">
              <p className="font-nunitoBoldItalic text-primary text-[8px]">
                ADRESSE MAIL/EMAIL ADDRESS
              </p>
              <p className="w-full text-[8px] lowercase">{ card.email }</p>
            </div>
          </div>
          <div className="h-1/3 flex w-full">
            <div className="w-1/2 h-full mr-2">
              <p className="w-full font-nunitoBoldItalic text-primary text-[8px] uppercase">
                TELEPHONE/PHONE
              </p>
              <p className="w-full text-[8px]">{card.phone}</p>
            </div>
            <div className="relative w-1/2 h-full">
              <p className="w-full font-nunitoBoldItalic text-primary text-[8px]">
                VALIDITÉ/VALIDITY
              </p>
              <p className="w-full text-[8px] uppercase">{`${formatDateBySlash(card.birthDate)} - ${formatDateBySlash(card.birthDate)}`}</p>

              <img src={signature} width={200} className="absolute -top-[1rem]" />
            </div>
          </div>
          <div className="h-1/3 flex w-full">
            <div className="w-full h-full mr-2">
              <p className="font-nunitoBoldItalic text-primary text-[8px]">LE DOYEN/THE DEAN</p>
              <p className="w-full text-[8px]">PR TCHOUANKEU JEAN CLAUDE</p>
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col justify-center w-[30%]">
          <div className="relative mb-2 flex justify-center items-center w-full h-[80%]">
            {/* Top left*/}
            <div className="absolute top-0 left-[7px] w-[20px] h-[4px] bg-black"></div>
            <div className="absolute top-0 left-[7px] w-[4px] h-[20px] bg-black"></div>
            {/* Top right*/}
            <div className="absolute top-0 right-[7px] w-[20px] h-[4px] bg-black"></div>
            <div className="absolute top-0 right-[7px] w-[4px] h-[20px] bg-black"></div>
            {/* bottom left*/}
            <div className="absolute bottom-0 left-[7px] w-[20px] h-[4px] bg-black"></div>
            <div className="absolute bottom-0 left-[7px] w-[4px] h-[20px] bg-black"></div>
            {/* bottom right*/}

            <div className="absolute bottom-0 right-[7px] w-[20px] h-[4px] bg-black"></div>
            <div className="absolute bottom-0 right-[7px] w-[4px] h-[20px] bg-black"></div>
            {/* QRcode */}
            <div>
              <QrCodeGenerator code={card.code} />
            </div>
          </div>
          <p className="text-center font-nicoMojiRegular font-bold text-[6px] uppercase tracking-[0.06563rem]">
            {formatCode(card.code)}
          </p>
        </div>
      </div>
      <div className="w-full h-[4%] flex">
        <div className="w-1/3 bg-[#6DAD9D]" />
        <div className="w-1/3 bg-[#E8766E] flex justify-center items-center">
          <img src={star} alt="Yellow star" className="w-full h-full" />
        </div>
        <div className="w-1/3 bg-[#FAE24C]" />
      </div>
      <div className="font-nunitoRegular bg-white rounded-b-3xl h-[40%] px-2 pt-[3px] text-black text-[7px] leading-[11px] uppercase">
        <p>
          La carte d’étudiant (CE) est unique à chaque étudiant et considérée comme
          sa propriété. Le proriétaire de la CARTE D’ETUDIANT est responsable de sa
          sécurité, de ne pas la prêter à d’autres personnes et de signaler
          immédiatementement toute perte ou vol.
        </p>
        <p>
          The student card (CE) is unique to each student and considered as his
          property. The owner of the STUDENT CARD is responsible for its security,
          not lending it to other people and immediately reporting any loss or theft.
        </p>
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
