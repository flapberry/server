import mongoose from 'mongoose';

class AdminModel {
	constructor() {

		const Enquiry = new mongoose.Schema({
			name: String,
			mail: String,
			phno: String,
			message: String,
			quantity: Number,
			date: {
				type: Date,
				default: Date.now
			}
		});

		const Category = new mongoose.Schema({
			name: {
				type: String,
				unique: true
			},
			description: String,
			img: String,
			products: [{type: mongoose.Schema.Types.ObjectId, ref: 'adminProduct'}]
		})

		const Admin2Schema = new mongoose.Schema({
			name: String,
			description: String,
			size: String,
			cost: Number,
			// category: String,
			callback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry' }],
			img: [],
			topimg : String,
			discount: {
				percentage: Number,
				cost: Number
			}
		});

		const ContactUsSchema = new mongoose.Schema({
			name: String,
			mail: String,
			phno: String,
			message: String,
			date: {
				type: Date,
				default: Date.now
			}
		});

		const UserCred = new mongoose.Schema({
			username: String,
			password: String,
			contatusMail: Number,
			enquiryMail: Number
		});

		this.product = mongoose.model('adminProduct', Admin2Schema);
		this.contact = mongoose.model('Contact Us', ContactUsSchema);
		this.enquiry = mongoose.model('Enquiry', Enquiry);
		this.user = mongoose.model('User Credientials', UserCred);
		this.category = mongoose.model('Category', Category);
	}
}

export const Admin2db = new AdminModel();
