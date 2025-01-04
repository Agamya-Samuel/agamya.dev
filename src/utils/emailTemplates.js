import fs from 'fs';
import path from 'path';

export const getEmailTemplate = (templateName, data) => {
	try {
		const templatePath = path.join(process.cwd(), 'src', 'templates', templateName);
		let template = fs.readFileSync(templatePath, 'utf8');

		// Replace all placeholders with actual data
		Object.keys(data).forEach(key => {
			const regex = new RegExp(`{{${key}}}`, 'g');
			template = template.replace(regex, data[key]);
		});

		return template;
	} catch (error) {
		console.error('Error reading email template:', error);
		throw error;
	}
}; 