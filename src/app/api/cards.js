import axios from 'axios';
import connectMongo from '../../lib/mongodb';
import Card from '../../models/Card';

export default async function handler(req, res) {
	const { cardName } = req.query;

  await connectMongo();

	try {
		const response = await axios.get(
			'https://api.scryfall.com/cards/named?fuzzy=${cardName}'
		);
		const cardData = response.data;

    const existingCard = await Card.findOne({ name: cardData.name });
    if(!existingCard) {
      const card = new Card({
        name: cardData.name,
        imageUrl: cardData.image_uris?.normal,
        type: cardData.type_line,
        manaCost: cardData.mana_cost,
      });
      await card.save();
    }

		res.status(200).json(card);
	} catch (error) {
		res.status(500).json({ error: 'Card not found' });
	}
}
