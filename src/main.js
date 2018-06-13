const fs = require('fs');

function addItem(path, item) {
	if (!item.name || !item.quantity) return;

	const current = fs.readFileSync(path, 'utf-8').match(/\n/g);
	const count = current ? current.length + 1 : 1;

	const text = `${count}\t${item.name}\t${item.quantity}\n`;
	fs.writeFileSync(path, text, { flag: 'a' });
}

function getItem(path, idx) {
	const current = fs.readFileSync(path, 'utf-8').split('\n');
	const item = current[idx - 1];
	if (!item) return null;

	const properties = item.split('\t');
	return {
		name: properties[1],
		quantity: parseInt(properties[2])
	};
}

function updateItem(path, idx, item) {
	if (!item.name || !item.quantity) return;
	if (!getItem(path, idx)) return;

	const current = fs.readFileSync(path, 'utf-8').split('\n');
	const text = `${idx}\t${item.name}\t${item.quantity}\n`;
	current[idx - 1] = text;

	fs.writeFileSync(path, current.join('\n'));
}

module.exports = {
	addItem,
	getItem,
	updateItem,
};
