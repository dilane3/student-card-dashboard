import styles from "./styles/page.module.css";
import Card from "@/entities/studentCard.entity";
import ReceiptV1 from "@/components/molecules/receipt/ReceiptV1";

type Props = {
  cards: Card[];
};

export default function Page({ cards }: Props) {
  return (
    <section className={`h-a4 ${styles.page1} ${styles.page}`}>
      {cards.map((card, index) => (
        <ReceiptV1 card={card} key={index} />
      ))}
    </section>
  );
}
