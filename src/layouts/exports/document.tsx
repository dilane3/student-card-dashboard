import Card from "@/entities/studentCard.entity";
import Page from "./page";

type Props = {
  cards: Card[]
}

export default function Document({ cards }: Props) {
  // handlers
  const generateCardsPerPage = (cards: Card[]) => {
    const result = [];

    // group 10 cards per page
    for (let i = 0; i < cards.length; i += 10) {
      result.push(cards.slice(i, i + 10));
    }

    return result;
  }

  return (
    <>
      {
        generateCardsPerPage(cards).map((cardsPerPage, index) => (
          <>
            <Page key={index} cards={cardsPerPage} />
            <Page key={index} cards={cardsPerPage} cardSide="verso" />
          </>
        ))
      }
    </>
  )
}