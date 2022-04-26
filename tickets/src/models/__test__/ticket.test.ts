import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
	// Create ticket
	const tix = Ticket.build({
		title: 'Flux Capacitor',
		price: 50,
		userId: '#ADSOKBLOCK'
	})

	// save ticket
	await tix.save()

	// fetch ticket twice
	const firstFetch = await Ticket.findById(tix.id);
	const secondFetch = await Ticket.findById(tix.id);

	// make two seperate changes to the ticket
	firstFetch!.set({ price: 45 });
	secondFetch!.set({ price: 60 });

	// save first fetch
	await firstFetch!.save()

	// save second fetch
	try {
		await secondFetch!.save()
	} catch (err) {
		return;
	}
});