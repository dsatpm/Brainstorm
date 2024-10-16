'use client';

import { useState } from 'react';
import Card from '../components/Card';

const CardSearch = () => {
	const [cardName, setCardName] = useState('');
	const [card, setCard] = useState(null);
	const [error, setError] = useState(null);

	const handleSearch = async () => {
		setError(null);

		try {
			const res = await fetch(`/api/cards?cardName=${cardName}`);
			const data = await res.json();
			if (res.ok) {
				setCard(data);
			} else {
				setError(data.error);
			}
		} catch (error) {
			setError('Something went wrong!');
		}
	};

	return (
		<>
			<h1>Search for a Card</h1>
			<input
				type='text'
				value={cardName}
				onChange={(e) => setCardName(e.target.value)}
				placeholder='Enter a card name'
			/>
			<button onClick={handleSearch}>Search</button>

			{card && <Card card={card} />}
			{error && <p>{error}</p>}
		</>
	);
};

export default CardSearch;
