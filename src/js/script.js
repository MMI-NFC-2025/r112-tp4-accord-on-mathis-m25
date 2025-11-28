// *** ACCORDEON ***

const allDetails = document.querySelectorAll('.accordeon details');

document.querySelectorAll('.accordeon summary').forEach(summary => {
    summary.addEventListener('click', (event) => {
        event.preventDefault(); 
        
        const details = summary.parentNode;
        const content = details.querySelector('.content');

        if (details.hasAttribute('open')) {
            
            // 1. Fixe la hauteur actuelle pour commencer la transition
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // 2. Déclenche la transition (hauteur -> 0)
            requestAnimationFrame(() => {
                content.style.maxHeight = '0';
            });
            
            // 3. Attend la fin de la transition (300ms) avant de retirer l'attribut 'open'
            setTimeout(() => {
                details.removeAttribute('open');
                content.style.maxHeight = null;
            }, 300); 
            
        } else {
            
            allDetails.forEach(otherDetails => {
                if (otherDetails !== details && otherDetails.hasAttribute('open')) {
                    const otherContent = otherDetails.querySelector('.content');
                    otherContent.style.maxHeight = '0';
                    
                    setTimeout(() => {
                         otherDetails.removeAttribute('open');
                         otherContent.style.maxHeight = null;
                    }, 50); 
                }
            });
            
            // 1. Ajoute l'attribut 'open'
            details.setAttribute('open', '');
            
            // 2. Calcule la hauteur exacte du contenu et l'applique pour l'animation
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // 3. Remet à null après l'animation pour que le contenu s'adapte (responsive)
            content.addEventListener('transitionend', function handler() {
                content.style.maxHeight = null;
                content.removeEventListener('transitionend', handler);
            });
        }
    });
});