module.exports = function filterObj(obj, filter) {
    try {
        if (!(obj instanceof Object)){
            throw new Error("first parameter should be of type object")
        }

        if (!(filter instanceof Array)) {
            throw new Error("second parameter should be of type array")
        }

        const keys = Object.keys(obj);
        const basic_fields = filter.map(field => field[0])
        const dataToReturn = {};
        let pattern;

        /* istanbul ignore next */
        keys.forEach((field, index) => {
            if (basic_fields.includes(field)) {
                pattern = ""
                repeatCheckingForAllowedKeys(index, field, filter, dataToReturn, obj, false);
            }
        });

        function getValue(obj, path) {
            if (!path) return obj;
            const properties = path.split('.');
            return getValue(obj[properties.shift()], properties.join('.'))
        }

        /* istanbul ignore next */
        function repeatCheckingForAllowedKeys(index, field_name, allowed_field, dataToReturn, obj, within = true) {
            const row = within ? allowed_field : allowed_field[index];
            pattern = !pattern ? field_name : pattern + `.${field_name}`

            if (row.length < 2) {
                dataToReturn[field_name] = getValue(obj, pattern)
            } else {
                const allowed = row[1];

                /* istanbul ignore else */
                if (!dataToReturn[field_name]) {
                    dataToReturn[field_name] = {}
                }

                allowed.forEach((row) => {
                    if (typeof row === "string") {
                        dataToReturn[field_name][row] = obj[field_name][row];
                    }

                    if (typeof row === "object") { //array
                        const index = 1
                        const field = row[0]
                        repeatCheckingForAllowedKeys(index, field, row, dataToReturn[field_name], obj[field_name], true)
                    }
                });

            }

        }

        return dataToReturn;
    }catch(e){
        throw e;
    }
}