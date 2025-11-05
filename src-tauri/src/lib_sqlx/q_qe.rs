use super::{DbExec, QEBase, QESite};
// use crate::QESite;


// weather actions -----------------------------
// getTestWeatherData for display on table load or export to csv
// updateWeatherQe as in reassign
// insert weather data (or insert QE).... each site will have its own data so array of weather sites. will also need dodic/lot/etc
// deleteQe ... no longer needed

pub(crate) async fn delete_test_qes<'e, E>(executor: E, test_id: i64) ->
	Result<(), sqlx::Error>
	where E: DbExec<'e> {
	sqlx::query!(
		"DELETE FROM qe WHERE test_id = ?", 
		test_id
	)
    .execute(executor)
    .await?;
	
	Ok(())
}

pub(crate) async fn delete_qe<'e, E>(executor: E, qe: QEBase) ->
    Result<(), sqlx::Error>
    where E: DbExec<'e> {

    sqlx::query!(
		r#"
		DELETE FROM qe WHERE 
		count = ? AND qe_type = ? AND test_id = ?
		"#, 
		qe.count,
		qe.qe_type,
		qe.test_id
	)
    .execute(executor)
    .await?;
	
	Ok(())
}

pub(crate) async fn delete_qe_site<'e, E>(executor: E, qe_site: QESite) ->
	Result<(), sqlx::Error>
	where E: DbExec<'e> {

	sqlx::query!(
		r#"
		DELETE FROM qe WHERE 
		count = ? AND qe_type = ? AND test_id = ? AND site_id = ?
		"#, 
		qe_site.base.count,
		qe_site.base.qe_type,
		qe_site.base.test_id,
		qe_site.site_id
	)
    .execute(executor)
    .await?;
	
	Ok(())
}

// pub(crate) async fn delete_all_qes

// pub(crate) async fn delete_qe_site<'e, E>(executor: E) ->
//     Result<(), sqlx::Error>
//     where E: DbExec<'e> {

// 	sqlx::query!(
// 		r#"DELETE FROM weather
// 		"#
// 	)
//     Ok(())
// }


/*
	def deleteQeWeather(self, sess_id: int, qe: int, qe_type: str, site=None):
		''' delete QE session weather data, a qe is unique by its
		type and session. NOTE WILL DELETE ALL SITE DATA IF SITE NOT PROVIDED
		Args:
			sess_id - (int) session id
			qe - (int) quality evaluation count
			qe_type - (str) 'TR' or 'WS'
		Kwargs:
			site (str | None) - limit deletions to a specific site if one
				provided. Otherwise delete all based off qe and type
		'''
		if site is not None:
			binding = (qe, qe_type, sess_id, site)
			sql = ''' DELETE FROM Weather WHERE qe = ? AND qe_type = ? \
				AND session_id = ? AND site_id = ?'''
		else:
			binding = (qe, qe_type, sess_id)
			sql = ''' DELETE FROM Weather WHERE qe = ? AND qe_type = ? \
				AND session_ID = ? '''
		self.c.execute(sql, binding)
		self.conn.commit()



        def qualityEvaluationsDeleted(self):
		''' delete selected rows from table and from database
		Preconditions: 
			WeatherTable will have one or more rows selected for deletion
		'''
		m = 'Proceed with deleting the selected rows?'
		if self.mb.display('Delete Rows', m, prompt_type='okcancel'):
			table = self.builders['table'].table

			# remove from database, after deleting from table
			for iid in table.deleteSelected():
				qe, _type, site = table.parseRowIID(iid)
				self.db.deleteQeWeather(self.session_id, qe, \
					_type, site=site)

		# may no longer be overwriting if current qe is deleted
		self.builders['firing'].warnIfOverwriting()
		
*/