function countNestedArrays(sourceData){
    let increment = 0
    const countNestedArr = (sourceData) => {
        if ( Array.isArray(sourceData ) ){
            increment = increment + 1
            for ( const data of sourceData ){
                countNestedArr(data)
            }
        }
    }
    countNestedArr(sourceData);
    return increment
}

function getValue(sourceObj, path) {
    if (!path) return sourceObj;
    const properties = path.split('.');
    return getValue(sourceObj[properties.shift()], properties.join('.'))
}

function filterObj(sourceObj, filterFields) {
    try {
        if (!(sourceObj instanceof Object)){
            throw new Error("first parameter should be of type object")
        }

        if (!(filterFields instanceof Array)) {
            throw new Error("second parameter should be of type array")
        }

        const resultsObj = {};
        const keys = Object.keys(sourceObj);
        let pattern;

        const nestedArr = countNestedArrays(filterFields)
        if (  nestedArr < 2 ){
            console.log("filterFields", filterFields)
            filterFields.forEach(top_level_field => {
                if ( keys.includes(top_level_field) ){
                    resultsObj[top_level_field] = getValue(sourceObj, top_level_field)
                }
                else if ( top_level_field.indexOf('.') > -1 ){
                    resultsObj[top_level_field] = getValue(sourceObj, top_level_field)
                }
            });
        }else {
            const keys = Object.keys(sourceObj);
            const basic_fields = filterFields.map(field => field[0]);
            

            /* istanbul ignore next */
            basic_fields.forEach((top_level_field, index) => {
                if ( keys.includes(top_level_field) ){
                    pattern = ""
                    repeatCheckingForAllowedKeys(index, top_level_field, filterFields, resultsObj, sourceObj, false);
                }
                else if ( top_level_field.indexOf('.') > -1 ){
                    repeatCheckingForAllowedKeys(index, top_level_field, filterFields, resultsObj, sourceObj, false);
                }
            })
        }

        /* istanbul ignore next */
        function repeatCheckingForAllowedKeys(index, field_name, allowed_field, resultsObj, sourceObj, within = true) {
            const row = within ? allowed_field : allowed_field[index];
            pattern = !pattern ? field_name : pattern + `.${field_name}`

            if (row.length < 2) {
                if ( field_name.indexOf(".") > -1 ) {
                    const value =  getValue(sourceObj, field_name)
                    resultsObj[field_name] = value;
                }else {
                    resultsObj[field_name] = getValue(sourceObj, pattern)
                }
            } else {
                const allowed = row[1];

                /* istanbul ignore else */
                if (!resultsObj[field_name]) {
                    resultsObj[field_name] = {}
                }

                allowed.forEach((row) => {
                    if (typeof row === "string") {
                        if ( row.indexOf(".") > -1 ){
                            const path = `${field_name}.${row}`
                            const value = getValue(sourceObj, path);
                            resultsObj[field_name][row] = value;
                        }else {
                            resultsObj[field_name][row] = sourceObj[field_name][row];
                        }
                    }

                    if (typeof row === "object") { //array
                        const index = 1
                        const field = row[0]
                        repeatCheckingForAllowedKeys(index, field, row, resultsObj[field_name], sourceObj[field_name], true)
                    }
                });
            }

        }

        return resultsObj;
    }catch(e){
        throw e;
    }
}

exports.filterObj = filterObj
module.exports = filterObj
