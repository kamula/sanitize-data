const target = {
    "name": "masinp pkk",
    "name_unique": "main_supplier",
    "description": "shampoo for hair wash",
    "unknownKey": "llo",
    "supplier_address": {
        "create": {
            "address_type": "billing",
            "address": { "test": "test" },
            "partner_id": "c57fd6cf-e194-4666-9679-c96a71a118e8"
        }
    },
    "partner_id": "c57fd6cf-e194-4666-9679-c96a71a118e8"
};


const source = {
    name: 'masinp pkk',
    name_unique: 'main_supplier',
    description: 'shampoo for hair wash',
    partner_id: 'c57fd6cf-e194-4666-9679-c96a71a118e8',
    address_type: 'billing',
    address: { test: 'test' }
};

const keysToKeep = ['create', 'createMany', 'data', 'supplier', 'supplier_address'];

const sanitizeData = (target, source, keysToKeep) => {
    const deepSanitizeData = (object, source, keysToKeep) => {
        const sanitized_data = {};
        for (const [key, value] of Object.entries(object)) {
            if (keysToKeep.includes(key)) {
                // Keep because it's in keysToKeep
                sanitized_data[key] = value;
            } else if (key in source) {
                // Keep if the key is also in the source object
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    //sanitize recursively for nested objects
                    const nestedSource = source[key] ?? {};
                    const nestedSanitized = deepSanitizeData(value, nestedSource, keysToKeep);
                    if (Object.keys(nestedSanitized).length > 0) {
                        sanitized_data[key] = nestedSanitized;
                    }
                } else {
                    // Keep the value if not an object or if no further nesting is needed
                    sanitized_data[key] = value;
                }
            }
        }
        return sanitized_data;
    }

    return deepSanitizeData(target, source, keysToKeep);
}

const sanitizedData = sanitizeData(target, source, keysToKeep);
console.log(sanitizedData);