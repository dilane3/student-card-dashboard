import CardRector from "@/components/molecules/cards/CardRecto";
import CardVerso from "@/components/molecules/cards/CardVerso";
import styles from "./styles/page.module.css";
import Card from "@/entities/studentCard.entity";

type Props = {
  cardSide?: "recto" | "verso";
  cards: Card[];
};

export default function Page({ cardSide = "recto", cards }: Props) {
  return (
    <section
      className={`h-a4 ${cardSide === "recto" ? styles.page1 : styles.page2} ${styles.page}`}
    >
      {cardSide === "recto" ? (
        <>
          {cards.map((card, index) => (
            <CardRector card={card} key={index} />
          ))}
        </>
      ) : (
        <>
          {cards.map((card, index) => (
            <CardVerso card={card} key={index} />
          ))}
        </>
      )}
    </section>
  );
}
