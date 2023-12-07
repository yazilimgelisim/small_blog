let targets = document.querySelectorAll('.target');
const options = {
   threshold: 0.5
}
const callBack = (enties)=>{
   enties.forEach((entry)=>{
      if(entry.isIntersecting){
         entry.target.classList.add('active')
      }
      else{
         entry.target.classList.remove('active')
      }
   })
}
const observer = new IntersectionObserver(callBack, options)
targets.forEach((target)=>{
   observer.observe(target)
})