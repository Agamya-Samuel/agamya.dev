import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getEmailTemplate = (templateName, data = {}) => {
	try {
		const templatePath = path.join(__dirname, '..', 'templates', templateName);
		let template = fs.readFileSync(templatePath, 'utf8');

		// Replace placeholders with actual data
		Object.entries(data).forEach(([key, value]) => {
			const regex = new RegExp(`{{${key}}}`, 'g');
			template = template.replace(regex, value);
		});

		return template;
	} catch (error) {
		console.error('Error reading email template:', error);
		throw error;
	}
}; 