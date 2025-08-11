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
        "Diphtheria", "Tetanus", "Pertussis", "Measles", "Mumps", "Rubella", 
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

    // Supplier data with phone numbers
    const suppliers = [
        {
            id: 1,
            name: "Supplier A",
            gst: "XYZ001",
            license: "DL001",
            years: "14",
            phone: "+911234567891",
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
            phone: "+911234567892",
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
            phone: "+911234567893",
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
            phone: "+911234567894",
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

    // Equipment tooltip information
    const equipmentInfo = {
        refrigerator: "Storage unit for vaccines at 2-8°C temperature",
        stabilizer: "Maintains consistent voltage to protect refrigeration equipment",
        generator: "Provides backup power during outages to maintain cold chain",
        boxes: "Portable containers for vaccine transportation with temperature control",
        thermometer: "Digital device for accurate temperature monitoring",
        logger: "Records and stores temperature data for documentation"
    };

    // Render supplier cards with all features
    function renderSuppliers(suppliersToRender = suppliers) {
        const container = document.getElementById('suppliers-container');
        container.innerHTML = '';

        suppliersToRender.forEach(supplier => {
            const card = document.createElement('div');
            card.className = 'supplier-card';
            card.dataset.id = supplier.id;

            // Create equipment details HTML with info icons
            const equipmentDetails = `
                <div class="equipment-item">
                    <span class="equipment-label">Refrigerator:</span>
                    <span>${supplier.equipment.refrigerator}</span>
                    <span class="info-icon" data-tooltip="${equipmentInfo.refrigerator}">i</span>
                </div>
                <div class="equipment-item">
                    <span class="equipment-label">Voltage Stabilizer:</span>
                    <span class="${supplier.equipment.stabilizer ? 'equipment-yes' : 'equipment-no'}">
                        ${supplier.equipment.stabilizer ? 'Yes' : 'No'}
                    </span>
                    <span class="info-icon" data-tooltip="${equipmentInfo.stabilizer}">i</span>
                </div>
                <div class="equipment-item">
                    <span class="equipment-label">Emergency Generator:</span>
                    <span class="${supplier.equipment.generator ? 'equipment-yes' : 'equipment-no'}">
                        ${supplier.equipment.generator ? 'Yes' : 'No'}
                    </span>
                    <span class="info-icon" data-tooltip="${equipmentInfo.generator}">i</span>
                </div>
                <div class="equipment-item">
                    <span class="equipment-label">Cold Chain Boxes:</span>
                    <span class="${supplier.equipment.boxes ? 'equipment-yes' : 'equipment-no'}">
                        ${supplier.equipment.boxes ? 'Yes' : 'No'}
                    </span>
                    <span class="info-icon" data-tooltip="${equipmentInfo.boxes}">i</span>
                </div>
                <div class="equipment-item">
                    <span class="equipment-label">Digital Thermometer:</span>
                    <span class="${supplier.equipment.thermometer ? 'equipment-yes' : 'equipment-no'}">
                        ${supplier.equipment.thermometer ? 'Yes' : 'No'}
                    </span>
                    <span class="info-icon" data-tooltip="${equipmentInfo.thermometer}">i</span>
                </div>
                <div class="equipment-item">
                    <span class="equipment-label">Data Logger:</span>
                    <span class="${supplier.equipment.logger ? 'equipment-yes' : 'equipment-no'}">
                        ${supplier.equipment.logger ? 'Yes' : 'No'}
                    </span>
                    <span class="info-icon" data-tooltip="${equipmentInfo.logger}">i</span>
                </div>
            `;

            card.innerHTML = `
                <div class="supplier-header">
                    <h3>${supplier.name}</h3>
                </div>
                <div class="supplier-info">
                    <p><strong>GST:</strong> ${supplier.gst} | <strong>Drug License:</strong> ${supplier.license} | <strong>Years:</strong> ${supplier.years}</p>
                </div>
                <div class="supplier-basic-details">
                    <h4>Top Diseases:</h4>
                    <p>${supplier.diseases.slice(0, 5).join(', ')}${supplier.diseases.length > 5 ? '...' : ''}</p>
                    
                    <h4>Main Equipment:</h4>
                    <p>${supplier.equipment.refrigerator}${supplier.equipment.generator ? ', Generator' : ''}</p>
                    
                    <h4>Area:</h4>
                    <p>${supplier.area}</p>
                </div>
                <div class="supplier-full-details">
                    <h4>All Diseases:</h4>
                    <p>${supplier.diseases.join(', ')}</p>
                    
                    <h4>Complete Equipment:</h4>
                    ${equipmentDetails}
                    
                    <h4>Type:</h4>
                    <p>${supplier.type} vaccine</p>
                    
                    <h4>Services:</h4>
                    <p>${supplier.services.join(', ')}</p>
                    
                    <h4>Contact:</h4>
                    <p>Phone: ${supplier.phone}</p>
                </div>
                <button class="call-btn" data-phone="${supplier.phone}">
                    <svg class="call-icon" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                    </svg>
                    Call Now
                </button>
                <button class="show-more-btn">Show More</button>
            `;
            container.appendChild(card);
        });

        // Add event listeners to all show more buttons
        document.querySelectorAll('.show-more-btn').forEach(button => {
            button.addEventListener('click', function() {
                const details = this.parentElement.querySelector('.supplier-full-details');
                details.classList.toggle('expanded');
                this.textContent = details.classList.contains('expanded') ? 'Show Less' : 'Show More';
            });
        });

        // Add click handler for call buttons
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const phoneNumber = this.getAttribute('data-phone');
                window.open(`tel:${phoneNumber}`);
            });
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
        
        // Uncheck all equipment checkboxes (including refrigerator types)
        document.querySelectorAll('#equip-refrigerator, .refrigerator-type, #equip-stabilizer, #equip-generator, #equip-boxes, #equip-thermometer, #equip-logger').forEach(checkbox => {
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
