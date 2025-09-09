const { createApp } = Vue;

createApp({
    data() {
        return {
            formData: {
                name: '',
                category: '',
                difficulty: '',
                elevation: '',
                distance: '',
                location: '',
                duration: '',
                description: '',
                tags: ''
            },
            files: {
                mapa: null,
                profil: null,
                gpx: null,
                images: []
            },
            isGenerating: false,
            errorMessage: ''
        };
    },
    methods: {
        handleFileUpload(event, fileType) {
            const file = event.target.files[0];
            if (file) {
                this.files[fileType] = file;
            }
        },
        
        handleMultipleFileUpload(event, fileType) {
            const files = Array.from(event.target.files);
            this.files[fileType] = files;
        },
        
        generateId(name) {
            return name.toLowerCase()
                .replace(/[áäâà]/g, 'a')
                .replace(/[éèê]/g, 'e')
                .replace(/[íì]/g, 'i')
                .replace(/[óôò]/g, 'o')
                .replace(/[úù]/g, 'u')
                .replace(/[ý]/g, 'y')
                .replace(/[č]/g, 'c')
                .replace(/[ď]/g, 'd')
                .replace(/[ľ]/g, 'l')
                .replace(/[ň]/g, 'n')
                .replace(/[ŕ]/g, 'r')
                .replace(/[š]/g, 's')
                .replace(/[ť]/g, 't')
                .replace(/[ž]/g, 'z')
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        },
        
        getDifficultyIcon(difficulty) {
            const icons = {
                'easy': '🟢',
                'moderate': '🟡', 
                'hard': '🔴',
                'extreme': '⚫'
            };
            return icons[difficulty] || '🟡';
        },
        
        getCategoryIcon(category) {
            const icons = {
                'cycling': '🚴',
                'hiking': '🥾',
                'running': '🏃',
                'skiing': '⛷️'
            };
            return icons[category] || '🚴';
        },
        
        generateTrackInfo() {
            const id = this.generateId(this.formData.name);
            const tags = this.formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            const currentDate = new Date().toISOString().split('T')[0];
            
            const difficultyMap = {
                'easy': 'ľahká',
                'moderate': 'stredná',
                'hard': 'ťažká',
                'extreme': 'extrémna'
            };
            
            const categoryMap = {
                'cycling': 'cyklistika',
                'hiking': 'turistika', 
                'running': 'beh',
                'skiing': 'lyžovanie'
            };
            
            return {
                id: id,
                name: this.formData.name,
                description: this.formData.description,
                sport: this.formData.category,
                distance: `${this.formData.distance} km`,
                distanceValue: parseFloat(this.formData.distance),
                difficulty: this.formData.difficulty,
                location: this.formData.location,
                locationRegion: "slovakia",
                duration: this.formData.duration,
                elevation: `${this.formData.elevation}m`,
                previewImage: "./preview.png",
                gpxFile: "./track.gpx",
                mapUrl: "",
                tags: tags,
                createdAt: currentDate,
                about: {
                    title: "O tejto trase",
                    createdText: `Vytvorené dňa ${new Date().toLocaleDateString('sk-SK')}`,
                    experienceText: `Táto trasa ponúka zážitok ${difficultyMap[this.formData.difficulty]} úrovne, ideálny pre nadšencov ${categoryMap[this.formData.category]}.`
                },
                stats: {
                    distance: {
                        icon: "📏",
                        label: "Vzdialenosť",
                        value: `${this.formData.distance} km`
                    },
                    duration: {
                        icon: "⏱️",
                        label: "Trvanie",
                        value: this.formData.duration
                    },
                    elevation: {
                        icon: "⛰️",
                        label: "Prevýšenie", 
                        value: `${this.formData.elevation}m`
                    },
                    startPoint: {
                        icon: "📍",
                        label: "START",
                        value: this.formData.location
                    }
                }
            };
        },
        
        async generateZip() {
            try {
                this.isGenerating = true;
                this.errorMessage = '';
                
                // Validate required files
                if (!this.files.mapa || !this.files.profil || !this.files.gpx) {
                    throw new Error('Chýbajú povinné súbory (mapa, profil alebo GPX)');
                }
                
                const zip = new JSZip();
                const trackInfo = this.generateTrackInfo();
                
                // Add track-info.json
                zip.file('track-info.json', JSON.stringify(trackInfo, null, 2));
                
                // Add preview image (mapa)
                zip.file('preview.png', this.files.mapa);
                
                // Add profil image  
                zip.file('profil.png', this.files.profil);
                
                // Add GPX file
                zip.file('track.gpx', this.files.gpx);
                
                // Add additional images
                if (this.files.images && this.files.images.length > 0) {
                    this.files.images.forEach((image, index) => {
                        const extension = image.name.split('.').pop();
                        zip.file(`img${index + 1}.${extension}`, image);
                    });
                }
                
                // Generate and download ZIP
                const content = await zip.generateAsync({ type: 'blob' });
                const url = URL.createObjectURL(content);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${trackInfo.id}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
            } catch (error) {
                this.errorMessage = error.message || 'Nastala chyba pri generovaní ZIP súboru';
                console.error('Error generating ZIP:', error);
            } finally {
                this.isGenerating = false;
            }
        }
    }
}).mount('#app');
