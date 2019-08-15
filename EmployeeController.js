module.exports = function(app, db, jsonParser, urlencodedParser, cors){
	
	var fields = ["EmpId", "FName", "LName", "DepartmentId", "ManagerId", "PhoneNumber"];

	app.use(jsonParser);
	app.use(urlencodedParser);

	//allow OPTIONS on all resources
	app.options('*', cors())

	console.log("Registering get endpoint: /api/employees");
	
	app.get('/api/employees', cors(), function(req, res){
		var sql = "SELECT " + fields.join(", ") + " FROM employees";
		db.all( sql, function(err, rows) {
			if (err) {
				res.status(400).json({"error":err.message});
				return;
			}
			res.json({
				"message": "success",
				"data": rows
			})
		});
	});

	console.log("Registering get endpoint: /api/employees/{id}");

	app.get("/api/employees/:id", cors(), (req, res) => {
		var sql = "SELECT " + fields.join(", ") + " FROM employees WHERE EmpId = ?"
		var params = [req.params.id]
		db.get(sql, params, (err, row) => {
			if (err) {
				res.status(400).json({"error":err.message});
				return;
			}
			res.json({
				"message": "success",
				"data": row
			})
		});
	});

	console.log("Registering post endpoint: /api/employees");

	app.post("/api/employees/", cors(), (req, res) => {
		var errors=[]
		if (!req.body.LName){
			errors.push("No Last Name specified");
		}
		if (!req.body.ManagerId){
			errors.push("No ManagerId specified");
		}
		if (errors.length){
			res.status(400).json({"error":errors.join(",")});
			return;
		}

		var data = {
			FName: req.body.FName,
			LName: req.body.LName,
			DepartmentId: req.body.DepartmentId,
			ManagerId: req.body.ManagerId,
			PhoneNumber: req.body.PhoneNumber
		}
		var sql ='INSERT INTO employees (FName, LName, DepartmentId, ManagerId, PhoneNumber) VALUES (?,?,?,?,?)'
		var params =[data.FName, data.LName, data.DepartmentId, data.ManagerId, data.PhoneNumber];
		db.run(sql, params, function (err, result) {
			if (err){
				res.status(400).json({"error": err.message})
				return;
			}
			res.json({
				"message": "success",
				"data": data,
				"id" : this.lastID
			})
		});
	})

	console.log("Registering patch endpoint: /api/employees/{id}");

	app.patch("/api/employees/:id", cors(), (req, res) => {
		var data = {
			FName: req.body.FName,
			LName: req.body.LName,
			DepartmentId: req.body.DepartmentId,
			ManagerId: req.body.ManagerId,
			PhoneNumber: req.body.PhoneNumber
		}
		var sql ='UPDATE employees SET FName = COALESCE(?,FName), LName = COALESCE(?,LName),'
		+'DepartmentId = COALESCE(?,DepartmentId) , ManagerId = COALESCE(?,ManagerId),'
		+ 'PhoneNumber = COALESCE(?,PhoneNumber) WHERE EmpId = ?';
		var params =[data.FName, data.LName, data.DepartmentId, data.ManagerId, data.PhoneNumber, req.params.id];
		db.run(sql, params, function (err, result) {
			if (err){
				res.status(400).json({"error": res.message})
				return;
			}
			res.json({
				message: "success",
				data: data,
				changes: this.changes
			})
		});
	})

	console.log("Registering delete endpoint: /api/employees/{id}");

	app.delete("/api/employees/:id", cors(), (req, res, next) => {
		var sql = 'DELETE FROM employees WHERE EmpId = ?';
		var params = [req.params.id];
	    db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
	    });
	})

}
