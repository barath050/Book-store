import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookCard from './BookCard';
import { Search } from 'lucide-react';

const books = [
  { id: 1, title: 'The Midnight Library', author: 'Matt Haig', price: 24.99, category: 'Fiction', rating: 4.5, image: 'https://thispersondoesnotexist.com/?id=1', description: 'Between life and death there is a library, and within that library, the shelves go on forever.' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', price: 27.99, category: 'Self-Help', rating: 4.8, image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExIVFhUXFxoYGRYXEiEUGBgVFxgdGBodGBgaICggHBsmGxcWIjEiJSkrLi4uGCAzODMsNygtLisBCgoKDg0OGhAQGi0lICYwLS03LS0tLS02Mi0tLy0uNSsrLy0tNS0tLS0tLS0tLS0tLSsuLS02LS0rLS0vLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EAD8QAAEDAgMFAwoEBAYDAAAAAAEAAhEDIQQSMQUGE0FRImFxFBYyNFJzgZGSsiNCofAzgrHRB3KiweHxQ1Ni/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EACURAQEAAgEDBAIDAQAAAAAAAAABAhEhAxIxBBNBUSJxMoGhBf/aAAwDAQACEQMRAD8A+4oiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg8lJXhXDWp15dleIzNyyBZv5uWusXWdq75SVw4BlcF3Fc0iG5cvI5G5psNX5z4R1gaqFLEwMz2zkAdEfxA0SW9n0S4u1FoHUgBJykqMdSxN4e3+G0CQP4s9o6ejEALKi3EjKXOYewMzdBxA3VpicpcTryAjmC2JGUlRZp4rL6bc/DcLRlNXRrvRkA6kXgmLrKpTxPah7NZba0BzyA60wW8ME6zmOkAhJSkqPqjESYLMv4cXvZ44k2jtMkDoQOts8Q2uX0ywtDIdxGm5JMZcpjl2unL4NjtlJUZQp4qGZ3t9E54Fy+8FpiABa0X1tEHA0sXAioz0GTI/PnaXkWuCzMAIEQOvZCWlJUdlxEOu2c9Mi/5Bw+IPR1MVoPe3TlrxNPFkVMjqYJLeHOgGUZg45ZMun4QglZXLhtoMe9zGm7SQfEWXSqpu363ifev+4qwq2oiKoIiICIiAiIgIiICIiAiIgxKIUWKotWJrZGOeWudlEwxpc4+DRclbURUPsneSjiMpYKrWua5wdUouptIa5rT2nCNXgAc4PQqTbiqZEh7SIBkOEQTAM9CbKp4jcXPTo0zXBFKkaZmjIeDiqGIMjNa2HyRf055QdXmYW4nDFpmk2riatWGta0tdiPKaFMtmSWVXSCLQx8xmAV4RO7X3mw+HeWVOIS1gqVCyi6o2lTcS0PquaCGiQ7vhrjoCV24LalKrnyPEsc9rgbEFji1xg/lkG+ijNobDrmu+th8UKPGYxlWaAquimXZXUiXAMfD3DtNeNDFrx2L3HDnVHtqsa6oMWCThw8Hyp9N4zgu7YYKWWDrmtlhOBaRjKcNPEZDvROcQ68WM3vZZjEMktztzDUZhItNxysqW7/D4Oa4OrsJLMQ0HgEhr8RVpVMwzVCZaaJGsnPMiL8Dty61XEV6bm8Og5mMArZGcRxxlRr/SbUc6qAc1nNpwBl7cyA+gjF04aeIyHGGnOIcejTzPgtyo9TcEltP8em17aj6jnCi9zTxDSJDGPrOAtQZ6ecZu1AOtv2dxeGONk4hJJDAcoBcS0XJkhuUE8yCYEwoOlERFFVN2/W8T71/3FWtVTdv1vE+9f9xViVbURFpBERAREQEREBERAREQEREGJRCvAsVVHfvnVZj6tB/D4NJ9QOHAeHNo0sKyu+rxi8seQ+o1ppNbmhzTout+/wDRFLieTYk+l2AKRdlbRNcuzcXIRkDrBxMtIjSbA/ZNAnOaLS7iGpOUTxCzgl1+tMZT1Flppbu4Rrcgw9PL2rZZ9Knwj8OH2I5C2ivAh8Vv7Qp0n1H0aw4b3tewmkHgU6TK5cAasOHDqMMNJd2ogXWrbO/LaL2/hP4QxDqD3uaO24YerVDaHb9LOykJeA38SJsS2cxO7uEqTnw9N05pkXOdjabgeoLKdMEaHI3oFtr7EwzwWvosc0uc4gtkF1RhpvJnmWOc09xTgQW3t9W0m4ljKZ41GhWqNLix1PiUaIrZXtZUzizhqBMGDoT5i99msd26T6TaZq8dtRoLw1mH8oa6nw3uacwjmTqCAVMu3dwpLy6hTOcOaZEy17Ax4Mn8zQATzgTMLKnu9hA0tGHpZSXEgsBBzs4bpB1BZ2YP5RGiCJx+9Bds7F4mix9KpQp1CG1Q10PZTzgyxzmPbBFw48wYIIUZszfSowPFVrqxOJ8npfhig8vbR4tQVWZjlDQDBiTmFo7RtlPY2HFF9EUminUBzsInNmAac2uawA1NgByXmJ2DhahcX0GEvc17jFy9jcjXSLhwZ2ZF4togh6O+rHVaFM0KzOMxrgaoFKC9r3ZYcRmc3hkENJMkQCLjmxG+fEbhzRYWmp5DVOYA/g42q5mXWzgGOv3hT1PYGFDmVGYekHMa0MhmWAwEMERbKHOAtIDjCxwm7ODp/wAPDUm3Y6zIvScXU/pcSR0QQWzd+CWYbj4dzHV4lwcG0xmqmk0B7jBdYEtmYIgEmFc1EM3awYLT5PSBaSWw2I/E4gtzAecw5BxkQVLfFQeqqbt+t4n3r/uKtaqm7freJ96/7irCraiItIIiICIiAiIgIiICIiAiIgxKi9pbXZTOU5iejS2RBN4J7udo+RlHKmVGHEYkgEwSYdJjK0AD4SB9S4dXKzw6YYy+Vn2ftBtVuYSLmxgEaawSPzALqeYvfp++Q8fBVbdXEFtQ0zPa5d7ABETY6k9YXRvFtJpDqQBJlt9BEtdIjXUd1vgszqfh3Vq4flqJ+i+QI5iZmdb9e9Z6TqVXdgbSaAxhzZjcmJ0BmTOl5uOvWVI7R2oylIJJMTlDTmiBzGnO569y3M5cds3Gy6SJ6fqihcHvBTcYdLZOpsLTJnkLc40POy7cbjhTYHOmNJ1gwZkR3dPgrM5ZvaXGzh2ygChnbepBje0bgiMpkRLZdrzGkyt2H2zRc0vkt6yL8o5XnSykzx+zty+kmHf9rm2hjm0mZnHmB1ubfJR9HeGkSNQCRqNJA/ST/wBc+ja9WkabTUktc5uUtPPUEEf9XTvll1V7bLzHVgcW2owObMG0HUEag963z3afFR+xqtPgjh+iORN+lyTzM3suTG7wU2mGkugXc0SJvaDA5TIPcnfJJbTttuomwqru363ifev+4qc2btSnVs09q5LSIIv0Ovw6KD3b9bxPvX/cVvCy8xizS2oiLaCIiAiIgIiICIiAiIgIiIODbeJ4dFzpIOgjqbfpM/BVvd7E0qReahueyBkJ7P5tG+Fu5dm+GJuymDEAv7zqBH+pdWF3foljc7e1F4MX5/r0Xky7sup+Pw746mHPygsRimDE8WmZbmDvRym+WRBbJ5371Jby4NgaKzZzPe2T3EAaROjR+vVYbe2OymxrmN0Im/KRoDoJhYvqGrgWwQTSc0O8ABcd8Oasas7sb+29y6s/TbsTBU20hiCDmYHO+DR0jWBouHY2BGIrOdU09Jw6uJIi7dNTbuHh1bA2i3KMMWg5pEhwIIIEiLzqfguSjUfhKx7JLdINs7ZMFvf2df7qfjrG/Hz+znd+0jt3Y9JlM1GNLS3XnYzca3lx+ajsXiC/CNa7VlQgSOWV8fl5CRpotu1ttmu002NIBsRIcSYdAt/l/QaXTauEFLCsDvSdULjpzY+BPOB3plq7uPjRjua7vLr2HsalUpZ6jcznE6nLlAJA0A5Xv3KIo4MeUcO8B8SAGmxGnZAnRWjdw/gNERd/K38R0+CgW+uk2JFTlAnS4v8AuQrljO3FJld5OneHZFOkwPpjL2g0jWQY6yZsufEPLsDT7qggXMATrLdBIv3hS+9h/Bbb/wAjfneFDVfUqZJkcUcx0PPqrnJMrr6MbuTf2zOJLcGxrZ7bnDT8gubRrpy6rs2PsWm6lnqjMTNuQEnSAJ1Jt4dZ1YbAmpgwAO01xIEAyZgju1/QLVszbpotLHskNuACARqSDJtp8JUmpZcvGi7svb9u5+7xbVD6b4AdmE3LTefGZj4/Fcm7freJ96/7ivcPtLEV60MOVsiQADDe1qe8QfkvN2/W8T71/wBxXo6Pbz2xy6m+NraiIuzmIiICIiAiIgIiICIiAiIg0V8O1xktBI0JHy5HqfmVsJjpHjz5L1wURtLbDab4LSYANmzrP6f2+fPKzHmtSW+EpUpAgggX6iRPf10HyWFGg1kwA2SOQEnr4raBz5rh2rtDhAGCZMf0P+6lsnNJu8OhmEYIhjR/KJnSZ6rKvQa8ZXNkQRe/9efesMDXFRjXgRItIvH7hbz+yrNaHPQwVOndrQO+IPz6LLEUWuEOAOsA6eEeC8xtfIxz9crSY0JyiT15DouPY20uKXDJAbHMnUu9oA/l1v8ABZ3Je1dWzaRpUw0QAAOgEBajhG5gcomSZAi8D9bD5LeD1j5rl2hjhSaCQ6SYAAnnrabRdaupOUm2+vSDhBEjvuOv+2vJahhGZQ3I2OgaIi4/SdVng8QKjGvAIDhMEQVsY75+EJxeRjToNa3K0ADpFvktGJwTKl3NDjpJ+XXTu8V1DovQU1DbVh6LWiGgQDaBEHT9+JVZ3b9bxPvX/cVawVVN2/W8T71/3FaxSraiItIIiICIiAiIgIiICIiAiIgwJ7/BVDek/jX9kd83kAyPA/HmrgVTt6njjcoyNOvee8Lzeo/i7dH+S1sqj2hy1PLxOp/uoLeqsC2mQQe1IIIPTuP7hcnmvWm72HnMu1lszbuK48fsp9ENL3MMmLEgzbXMRrlMdVjPPO43cawxx35WLZmKZTwrHPMNggd9zAjqb2HRcrt42B3omNNQDadR0v15crrAUqLsLRdVe5rQDEOAkknxl1vC648VtLC8JzGUSTlLQ9wZMwYcXTM2nklzsk5+CYy28J7EYttTDVXtJjI7/MOxoRyPz6qC2Jj2UeKXSCYIa0XPae4xYWgD4LDYz/wcXf8A8R56Wf3/ALhZ7uYFlWo8uGZrOROuYvEkAnpp39yz3XLLGxe2YyypPD7x0yYILe/0gNSZ5xbpaY5SujbdajkbxW5mkjKQLz18NFw70YCm2mHta1pB5ANBB66CZ+Oveo/EVS7CUu55Gs2m2ru8DXot3PKbxqTGXViSxG1KTKDWMY4B7HBogBsZshk3vztMz3qP2BtNlHMHB3bLYygRAAaNYIF+/wCEX6GYJjsG2o4XayxzEAdsuuJg3t/wtO7Oz6dUONQSW5Y7catadA7TRYvdcppfx7am9p7YZR7NyegvHTMeUie/+q04DbtOochGWTF/RJMmJ6np3akqH2jmpYk1HtkFxcCYEiNBJiW25G4XXQxeFr1AXMyPJA9MZSe17LhJibkcwt+5e7W/6TsmlmBVV3b9bxPvX/cVagVVd2/W8T71/wBxXpjhVtREWkEREBERAREQEREBERAREQYlVDeeeMO1fKDYERe5sZ5TzVvcFz1sO1+rRy1HLW/MLj1Me6adMMu27bmAd3dBsoDe7SnJgZv9xPP+seKsAWupRBAkSAdI5aR4Jnj3TSY3V2qOPou8noOgxDmno0udoZ8NSbLcdssNE0adJ2YsLBzjML31PWVaBSAaBAHKAJEHUaaFYtwrAbNF+6NDIFuX9guftXfFb9yfMVXY7vwcVM/wj8ofzvy/crlwGOqUXF7RI0cCDEEvIk9bWKulCgGzAFze0WFvj/yUGFaAYa25v2QJHfa9pU9q8avhfcnPCpbT2s7EAU2sIAOgJeXkSByB0k3XTtbCmlh6TXG+eXESSXGSZvysJlWWlhmt0A+Q6yL62he1WBw0B6Ajn3gkSNLd3gte1bvd5T3JxqIjA0y/BZQROU840dJB6dNfkoXYm1eAS3JmzFonMWwRA/NPtd2iudOmGiALDQAAQJ+C1PwjSZLWm4NxcfsQPheUvTvFl8EznO4hsdtapTqllRjXU76N1bPW4kTcGNOUhQ+MeK1UcFhEwMt9QHXseyL6DorpWpB1jBg6G9/7x/VeUqDW6AXF4t4f1KZdO5ebwTOT4bKcxB+fW2qq27freJ96/wC4q1AKq7t+t4n3r/uK74uVW1ERaQREQEREBERAREQEREBERBiSvCvSixVeEJC9RFcNfa1Jj3te7LkaHEkWgmLRcx2Z6Z29Uq7Vptc9rpaKfpPI7Nw02Iv+ccuRTaGJo044gF5vkzc2g8uZLf2FyYra2HbUcyowQGgl5bNiWQCInV7fp5WRHaNp0iHEPByNLjHRpLTrbVrh4grnG26eWk4B7m1GF4Ibo0FjSXjlHEBMCIB7p10NrUHP4YaJc91OANQxrnkxGk5hHU80w+2MOQ2QGkjstyzGdjXkGBAMOEhB0na9ATNQCASZBbAuTMi3ovP8juhjzE7YptY54zPy5Za1va7bsoMOi0zflB6LQ3bFFzS5gDm52MmIk1Dk0Im0xBGi56G8mGyNcAGzTY9wDScoezOwOygzY8phUd+E2vReG5X+llgGSSHguYZv6TWkjuWrbm3GYcRYuiYmAAdC6L3gwBcweQJG/BYmjVc7IBmYe12YIu5gvz9Fw+C+d7xYnPXfmJ/MR4mcn+kUx8CvL6vrXpYbnl7vQemnX6msvETFTeXFGHBpykTYsaCIn0SHkW/+lKbI3nzONOq0BwMWGWDMQRJETAzAxOoaIVMqmnBy1avQZp0DTAsPat4TovMQ6k2Hsc9zpuH6ObcOmw10PiV87H1OeN33b/uf4+tl6LpZzXbr9S/6+tKqbt+t4n3r/uKnti1S6iwkkkS0k6kscWSe85ZUDu363ifev+4r7WF3NvzmePbbPpbURFtkREQEREBERAREQEREBERBiUQosVRERFYV6ga1zjo0EmASYAmwFz8FFN22406L+C4GoYcwu7VMyGumAQ6L6axaVMIiIl+3mZC4MqT2YaWwSXtzN62Ii/K/MEBidtZTSim5zagJJuC2HsZBZBM/iE8oyGYgkSyIIpm2g7PkpuIbk1td7sp/laCHE3sD0XtLbbTZ1Oo05yz0ZBI5g+yRBBMTmAF7KURBrw1cPY14BAcJAIgweoOi+e71bPdSrZwLSXjn2c2af5XOLSOQDeq+jLTi8Kyo3K9sjUXgg9WkXB7wuHqOj7uOvl6vSep9jPu1uPmYfVyhwe3RtoMwA43kzbM7xie86fJ3VK2SA7KcvZ/NckNEnUyR3ATo0lXWpudQJmT8Wtt9IAPxBUns3Y9Kj6Il0RmMSAdYAAa2ecATzXino88uMvH7fTy/6PTxluHN/WnRs/D8Om1hMkC5FgXG7iPEkqubt+t4n3r/ALirWqpu363ifev+4r6uM1w+HlbburaiItMiIiAiIgIiICIiAiIgIiIMSiFFiq0VsZTa9tIvaKjw4tYXAOcGxmLRqQJE+K+X7jbzVqOydnhppPqVfKCXV6ri6GV3xlp02uqP1AkCGgDqF9A3g3bw+MyGsHh1PNkqU6rqT25xDgHMIMOAAI5rkqblYPLQaxlSkMOwspmjiKlFwpuILmucxwc4EgEyZnxKogcNv5ia9PBHD4alxMVSxDyKtYtbTdhnBrrtaS4EzFhy0uvNi/4g1n8GpiMNTp0a2FrYlhp1TUqAYcAvDmloF5MAE8pVl2dulhKHA4VMt8nbVZS7bjlbXdmqC5vJ66cllgt1cJS4GSnbD030qYLy4CnVjOCCe1MDWU4Fb3b39r130w/CS2tRfVZweI4sc1nEbTqufTawlzZhzTEiOYK69yN834yq6lVZSpvFMVDTDntq0zIBY+nVY0mJHbbLZspPZe5uEoGWNqEZHU2sqYipVp06b/SbTY9xa0GIsNLLZsTdPDYWpxKQqF4ZwmmpXfWyUpByU+I45WyBYdE4FcxmBbtDa2Iw2JfU4GGoUXU6DazqTXuqyXVXcMhzi0gNF4C53U+DU2bRZjTiWsx9VmbPmcxoo1HCjVcHHM5lheDpYQrXt3dPC4uo2rVa9tVjSwVaVV1GpkJktLmEEtmbHSTGpWeG3WwlNmHZTpBjcM8vpAOPZeQWkm8uJDnTmnVNir7u/wCIdXE1aJGGHk9eo5jS3iOq02guDH1fw+HlcW3DXnLmGt1u2fv1Ufi6NI06BpV6tSk00qrqjmFjXOBc/JwnTkMta6084KnNnbn4ShVFWm2oMrnPbT47zRY98lzmUS7I0nMdBabQtWztx8FQfTdTbVHCeX0mHEVHU6RcHAinTLsrQc7rAc04Hm4+38RjaRr1KFOlSlzWZahe5zqdR7HEiBlb2RHOc3KFZVxbG2VSwtIUaLS2mC4gFxdd7i91zf0nErtUBVTdv1vE+9f9xVrVU3b9bxPvX/cVYVbURFpBERAREQEREBERAREQEREGupUA1IHiYWHlLPbb9QXLtjZLMQ0NdyUP5k0FNLtYvKWe236gnlLPbb9QVd8yaCeZNBTRtYvKWe236gnlLPbb9QVd8yaCeZNBNG1i8pZ7bfqCeUs9tv1BV3zJoJ5k0E0bWLylntt+oJ5Sz22/UFXfMmgnmTQTRtYvKWe236gnlLPbb9QVd8yaCeZNBNG1i8pZ7bfqCeUs9tv1BV3zJoJ5k0E0bWLylntt+oKsbtGcXiSP/Y/7itvmTQUnsfYbMOTl5qyIlkRFQREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//9k=', description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.' },
  { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', price: 28.99, category: 'Sci-Fi', rating: 4.7, image: 'https://thispersondoesnotexist.com/?id=3', description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller.' },
  { id: 4, title: 'Psychology of Money', author: 'Morgan Housel', price: 22.99, category: 'Business', rating: 4.6, image: 'https://thispersondoesnotexist.com/?id=4', description: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave.' },
  { id: 5, title: 'Dune', author: 'Frank Herbert', price: 19.99, category: 'Sci-Fi', rating: 4.9, image: 'https://thispersondoesnotexist.com/?id=5', description: 'A stunning blend of adventure and mysticism, environmentalism and politics.' },
  { id: 6, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', price: 29.99, category: 'Psychology', rating: 4.5, image: 'https://thispersondoesnotexist.com/?id=6', description: 'The major New York Times bestseller that challenges the judgments we make.' },
];

const HomePage = ({ user, onNavigate, addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Simple Hero */}
      <section className="text-center py-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Curated Books for <br className="hidden md:block" />
          <span className="text-blue-600 dark:text-blue-400">Curious Minds</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A minimal bookstore designed for simplicity. Find your next great read without the clutter.
        </p>
        
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search titles or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
          />
        </div>
      </section>


      {/* Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No books found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              addToCart={addToCart}
              user={user}
              onNavigate={onNavigate}
              index={index}
            />
          ))}
        </div>
      )}
      
      <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        © 2026 Bookstore. All rights reserved.
      </footer>
    </div>
  );
};


export default HomePage;
