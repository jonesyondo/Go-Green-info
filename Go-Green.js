
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(45, 125, 50, 0.95), rgba(76, 175, 80, 0.95))';
            } else {
                header.style.background = 'linear-gradient(135deg, #2d7d32, #4caf50)';
            }
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.problem-card, .solution-card, .impact-card, .feature-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Counter animation for impact numbers
        function animateCounter(element, start, end, duration) {
            let startTime = null;
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const current = Math.floor(progress * (end - start) + start);
                element.textContent = current.toLocaleString();
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Trigger counter animations when impact section comes into view
        const impactSection = document.querySelector('.impact-section');
        const impactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.impact-number');
                    counters.forEach(counter => {
                        const text = counter.textContent;
                        if (text.includes('%')) {
                            const num = parseInt(text);
                            animateCounter(counter, 0, num, 2000);
                            setTimeout(() => counter.textContent = num + '%', 2000);
                        } else if (text.includes('+')) {
                            const num = parseInt(text);
                            animateCounter(counter, 0, num, 2000);
                            setTimeout(() => counter.textContent = num + '+', 2000);
                        } else if (!isNaN(parseInt(text))) {
                            const num = parseInt(text.replace(/,/g, ''));
                            animateCounter(counter, 0, num, 2000);
                        }
                    });
                    impactObserver.unobserve(entry.target);
                }
            });
        });

        impactObserver.observe(impactSection);

        // Add mobile menu functionality
        const createMobileMenu = () => {
            if (window.innerWidth <= 768) {
                const nav = document.querySelector('.nav-links');
                const navContainer = document.querySelector('.nav-container');
                
                if (!document.querySelector('.mobile-menu-btn')) {
                    const menuBtn = document.createElement('button');
                    menuBtn.className = 'mobile-menu-btn';
                    menuBtn.innerHTML = '☰';
                    menuBtn.style.cssText = `
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        display: block;
                    `;
                    
                    menuBtn.addEventListener('click', () => {
                        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                        nav.style.position = 'absolute';
                        nav.style.top = '100%';
                        nav.style.left = '0';
                        nav.style.right = '0';
                        nav.style.background = 'linear-gradient(135deg, #2d7d32, #4caf50)';
                        nav.style.flexDirection = 'column';
                        nav.style.padding = '1rem';
                        nav.style.zIndex = '1000';
                    });
                    
                    navContainer.appendChild(menuBtn);
                }
            }
        };

        window.addEventListener('resize', createMobileMenu);
        createMobileMenu();

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add particles effect to hero
        const createParticles = () => {
            const hero = document.querySelector('.hero');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(129, 199, 132, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${5 + Math.random() * 10}s infinite linear;
                    animation-delay: ${Math.random() * 10}s;
                `;
                hero.appendChild(particle);
            }
        };

        createParticles();

        // Form handling for contact
        const handleContactForm = (e) => {
            e.preventDefault();
            alert('Thank you for your interest! We will contact you within 24 hours.');
        };

        // Add contact form if needed
        const addContactForm = () => {
            const contactSection = document.createElement('section');
            contactSection.innerHTML = `
                <div class="container" style="padding: 40px 0;">
                    <h3 style="text-align: center; margin-bottom: 2rem; color: #1b5e20;">Ready to Transform Your Community?</h3>
                    <form style="max-width: 500px; margin: 0 auto; display: grid; gap: 1rem;" onsubmit="handleContactForm(event)">
                        <input type="text" placeholder="Your Name" required style="padding: 12px; border: 2px solid #4caf50; border-radius: 10px; font-size: 1rem;">
                        <input type="email" placeholder="Email Address" required style="padding: 12px; border: 2px solid #4caf50; border-radius: 10px; font-size: 1rem;">
                        <input type="tel" placeholder="Phone Number" style="padding: 12px; border: 2px solid #4caf50; border-radius: 10px; font-size: 1rem;">
                        <select required style="padding: 12px; border: 2px solid #4caf50; border-radius: 10px; font-size: 1rem;">
                            <option value="">I'm interested in...</option>
                            <option value="household">Household Subscription</option>
                            <option value="business">Business Partnership</option>
                            <option value="investment">Investment Opportunity</option>
                            <option value="employment">Job Opportunities</option>
                            <option value="municipal">Municipal Contract</option>
                        </select>
                        <textarea placeholder="Tell us about your community or needs" rows="4" style="padding: 12px; border: 2px solid #4caf50; border-radius: 10px; font-size: 1rem; resize: vertical;"></textarea>
                        <button type="submit" class="btn-primary" style="justify-self: center;">Send Message</button>
                    </form>
                </div>
            `;
            
            const footer = document.querySelector('.footer');
            footer.parentNode.insertBefore(contactSection, footer);
        };

        // Uncomment to add contact form
        // addContactForm();

        console.log('GoGreen website loaded successfully! 🌱');
    