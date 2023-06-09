import db from '../database/connection.js';
import rentalQuery from '../helpers/rentalsQueryConstructor.js';
class RentalsRepository
{
	create( costumerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee ){
		return db.query( `
    INSERT INTO rentals ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,[ costumerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee] );
	}

	list( {customerId , gameId, offset, limit, order,	desc, status, startDate} ){
		const {query, params} = rentalQuery( {customerId , gameId, offset, limit, order,	desc, status, startDate} );
		return db.query( `${query};`, params );
	}

	listByRentalId( id ){
		return db.query( `
      SELECT * FROM rentals WHERE id = $1;
    `,[id] );
	}

	delete( id ){
		return db.query( `
      DELETE FROM rentals WHERE id= $1;
    `, [id] );
	}

	update( id, returnDate, delayFee = null ){
		return db.query( `
      UPDATE rentals SET "returnDate" = $2, "delayFee" = $3
      WHERE id = $1;
    `,[id, returnDate, delayFee] );
	}
}

export default new RentalsRepository;