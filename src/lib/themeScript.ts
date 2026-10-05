export const DEFAULT_COLOR = 'var(--theme-pink)'

// Executado no <head> antes da pintura: aplica o tema e a cor salvos (sem "piscar")
export const themeScript = `(function(){var h=document.documentElement,t,c;try{t=localStorage.getItem('theme');c=localStorage.getItem('color')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';h.classList.add('is-'+t);h.style.setProperty('--color-primary',c||'${DEFAULT_COLOR}')})()`
