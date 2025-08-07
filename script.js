document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter sections
    const filterHeaders = document.querySelectorAll('.filter-header');
    filterHeaders.forEach(header => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.toggle-arrow');
        
        // Set initial state (collapsed)
        content.style.display = 'none';
        arrow.textContent = '▼';
        
        header.addEventListener('click', function() {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                arrow.textContent = '▲';
            } else {
                content.style.display = 'none';
                arrow.textContent = '▼';
            }
        });
    });

    // Disease list (all 29 diseases)
    const diseases = [
        "Flu", "HPV", "Pneumococcal", "Chicken Pox", "Tuberculosis", "Polio", 
        "Diptheria", "Tetanus", "Pertussis", "Measles", "Mumps", "Rubella", 
        "Hepatitis B", "Hib", "Rotavirus", "Hepatitis A", "Typhoid", "Meningococcal", 
        "Zoster", "Cholera", "Japanese Encephalitis", "Rabies", "Yellow fever", 
        "Tick-borne Encephalitis", "Dengue", "Ebola", "Malaria", "Covid", "RSV"
    ];
    
    const diseaseListContainer = document.getElementById('diseases-filter');
    diseases.forEach(disease => {
        const item = document.createElement('div');
        item.className = 'filter-item';
        item.innerHTML = `
            <input type="checkbox" id="disease-${disease.toLowerCase().replace(/\s+/g, '-')}" class="disease-checkbox">
            <label for="disease-${disease.toLowerCase().replace(/\s+/g, '-')}">${disease}</label>
        `;
        diseaseListContainer.appendChild(item);
    });

    // Supplier data
    const suppliers = [
        {
            id: 1,
            name: "Supplier A",
            gst: "XYZ001",
            license: "DL001",
            years: "14",
            diseases: ["Flu", "Pneumococcal", "Typhoid", "Chicken Pox", "Tuberculosis", "Pertussis", "Rubella", "Hib", "Rabies", "Hepatitis A", "Hepatitis B"],
            equipment: {
                refrigerator: "Refrigerator",
                stabilizer: false,
                generator: true,
                boxes: true,
                thermometer: true,
                logger: false
            },
            area: "Howrah",
            type: "Human",
            services: ["Clinic vaccination"]
        },
        {
            id: 2,
            name: "Supplier B",
            gst: "ABC002",
            license: "DL002",
            years: "8",
            diseases: ["HPV", "Polio", "Diphtheria", "Tetanus", "Measles", "Mumps", "Rotavirus", "Meningococcal", "Zoster", "Dengue"],
            equipment: {
                refrigerator: "Walk-in-refrigerator",
                stabilizer: true,
                generator: true,
                boxes: true,
                thermometer: true,
                logger: true
            },
            area: "Kolkata",
            type: "Human",
            services: ["Home vaccination", "Clinic vaccination", "Home delivery"]
        },
        {
            id: 3,
            name: "Supplier C",
            gst: "DEF003",
            license: "DL003",
            years: "12",
            diseases: ["Chicken Pox", "Tuberculosis", "Polio", "Measles", "Mumps", "Hepatitis B", "Rotavirus", "Hepatitis A", "Typhoid", "Japanese Encephalitis"],
            equipment: {
                refrigerator: "ILR",
                stabilizer: true,
                generator: false,
                boxes: true,
                thermometer: true,
                logger: false
            },
            area: "Durgapur",
            type: "Human",
            services: ["Clinic vaccination", "Home delivery"]
        },
        {
            id: 4,
            name: "Supplier D",
            gst: "GHI004",
            license: "DL004",
            years: "6",
            diseases: ["Flu", "Pneumococcal", "HPV", "Tuberculosis", "Pertussis", "Rubella", "Rabies", "Hepatitis A", "Covid", "RSV"],
            equipment: {
                refrigerator: "Refrigerator",
                stabilizer: false,
                generator: true,
                boxes: false,
                thermometer: true,
                logger: true
            },
            area: "Asansol",
            type: "Animal",
            services: ["Home vaccination"]
        }
    ];

    // Render supplier cards
    function renderSuppliers(suppliersToRender = suppliers) {
        const container = document.getElementById('suppliers-container');
        container.innerHTML = '';

        suppliersToRender.forEach(supplier => {
            const card = document.createElement('div');
            card.className = 'supplier-card';
            card.dataset.id = supplier.id;

            // Equipment details string
            const equipmentDetails = `
                Refrigerator: ${supplier.equipment.refrigerator}, 
                Voltage Stabilizer: ${supplier.equipment.stabilizer ? 'Yes' : 'No'}, 
                Emergency Generator: ${supplier.equipment.generator ? 'Yes' : 'No'}, 
                Cold Chain Boxes: ${supplier.equipment.boxes ? 'Yes' : 'No'}, 
                Digital Thermometer: ${supplier.equipment.thermometer ? 'Yes' : 'No'}, 
                Data Logger: ${supplier.equipment.logger ? 'Yes' : 'No'}
            `;

            card.innerHTML = `
                <div class="supplier-header">
                    <h3>${supplier.name}</h3>
                </div>
                <div class="supplier-info">
                    <p><strong>GST:</strong> ${supplier.gst} | <strong>Drug License:</strong> ${supplier.license} | <strong>Years:</strong> ${supplier.years}</p>
                </div>
                <div class="supplier-details">
                    <h4>Diseases:</h4>
                    <p>${supplier.diseases.join(', ')}</p>
                    
                    <h4>Equipment:</h4>
                    <p>${equipmentDetails}</p>
                    
                    <h4>Area:</h4>
                    <p>${supplier.area}</p>
                    
                    <h4>Type:</h4>
                    <p>${supplier.type} vaccine</p>
                    
                    <h4>Services:</h4>
                    <p>${supplier.services.join(', ')}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Filter suppliers based on selected filters
    function filterSuppliers() {
        // Get selected diseases
        const selectedDiseases = Array.from(document.querySelectorAll('.disease-checkbox:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent.trim());

        // Get selected equipment
        const selectedEquipment = {
            refrigerator: null,
            stabilizer: document.getElementById('equip-stabilizer').checked,
            generator: document.getElementById('equip-generator').checked,
            boxes: document.getElementById('equip-boxes').checked,
            thermometer: document.getElementById('equip-thermometer').checked,
            logger: document.getElementById('equip-logger').checked
        };

        // Check refrigerator types
        if (document.getElementById('equip-walk-in').checked) {
            selectedEquipment.refrigerator = "Walk-in-refrigerator";
        } else if (document.getElementById('equip-regular').checked) {
            selectedEquipment.refrigerator = "Refrigerator";
        } else if (document.getElementById('equip-ilr').checked) {
            selectedEquipment.refrigerator = "ILR";
        }

        // Get selected vaccine types
        const selectedTypes = [];
        if (document.getElementById('vax-human').checked) selectedTypes.push("Human");
        if (document.getElementById('vax-animal').checked) selectedTypes.push("Animal");

        // Get selected services
        const selectedServices = [];
        if (document.getElementById('service-home').checked) selectedServices.push("Home vaccination");
        if (document.getElementById('service-clinic').checked) selectedServices.push("Clinic vaccination");
        if (document.getElementById('service-delivery').checked) selectedServices.push("Home delivery");

        // Filter the suppliers
        const filteredSuppliers = suppliers.filter(supplier => {
            // Filter by diseases if any are selected
            if (selectedDiseases.length > 0 && 
                !selectedDiseases.some(disease => supplier.diseases.includes(disease))) {
                return false;
            }

            // Filter by equipment
            if (selectedEquipment.refrigerator && 
                supplier.equipment.refrigerator !== selectedEquipment.refrigerator) {
                return false;
            }
            if (selectedEquipment.stabilizer && !supplier.equipment.stabilizer) return false;
            if (selectedEquipment.generator && !supplier.equipment.generator) return false;
            if (selectedEquipment.boxes && !supplier.equipment.boxes) return false;
            if (selectedEquipment.thermometer && !supplier.equipment.thermometer) return false;
            if (selectedEquipment.logger && !supplier.equipment.logger) return false;

            // Filter by vaccine type if any are selected
            if (selectedTypes.length > 0 && !selectedTypes.includes(supplier.type)) {
                return false;
            }

            // Filter by services if any are selected
            if (selectedServices.length > 0 && 
                !selectedServices.some(service => supplier.services.includes(service))) {
                return false;
            }

            return true;
        });

        renderSuppliers(filteredSuppliers);
    }

    // Reset all filters
    function resetFilters() {
        // Uncheck all disease checkboxes
        document.querySelectorAll('.disease-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Uncheck all equipment checkboxes
        document.querySelectorAll('.filter-group:nth-child(2) input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Uncheck vaccine type checkboxes
        document.getElementById('vax-human').checked = false;
        document.getElementById('vax-animal').checked = false;
        
        // Uncheck service checkboxes
        document.getElementById('service-home').checked = false;
        document.getElementById('service-clinic').checked = false;
        document.getElementById('service-delivery').checked = false;
        document.querySelectorAll('.filter-group:nth-child(4) .sub-items input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Show all suppliers again
        renderSuppliers(suppliers);
    }

    // Event listeners
    document.getElementById('apply-filters').addEventListener('click', filterSuppliers);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);

    // Initial render
    renderSuppliers();
});