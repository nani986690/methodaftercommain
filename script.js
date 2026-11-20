/*==========================================
script.js
==========================================*/

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const body = document.body;

const setMenuState = (isOpen) => {
    if (!navbar || !menuBtn) return;
    navbar.classList.toggle("active", isOpen);
    body.classList.toggle("menu-open", isOpen);
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
};

if (menuBtn && navbar) {
    if (!menuBtn.hasAttribute("aria-expanded")) {
        menuBtn.setAttribute("aria-expanded", "false");
    }

    menuBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setMenuState(!navbar.classList.contains("active"));
    });

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    document.addEventListener("click", (event) => {
        if (!navbar.classList.contains("active")) return;
        if (navbar.contains(event.target) || menuBtn.contains(event.target)) return;
        setMenuState(false);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });
}

/*==========================================
Sticky Header Shadow
==========================================*/

const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 15px 35px rgba(0,0,0,.08)";
        } else {
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";
        }
    });
}

/*==========================================
Scroll To Top Button
==========================================*/

const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "↑";
scrollBtn.className = "scroll-top";
scrollBtn.type = "button";
scrollBtn.setAttribute("aria-label", "Scroll to top of page");
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    scrollBtn.classList.add("is-visible");
  } else {
    scrollBtn.classList.remove("is-visible");
  }
}, { passive: true });

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/*==========================================
Reveal Animation
==========================================*/

const reveals=document.querySelectorAll("section");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{

opacity:0,
transform:"translateY(50px)"

},

{

opacity:1,
transform:"translateY(0)"

}

],{

duration:700,
fill:"forwards"

});

}

});

},{threshold:.15});

reveals.forEach(section=>{

observer.observe(section);

});

/*==========================================
Active Navigation
==========================================*/

const scrollSections = document.querySelectorAll("section[id]");
const scrollNavLinks = document.querySelectorAll(".navbar a");
let activeNavCurrent = "";

if (scrollSections.length && scrollNavLinks.length) {
    window.addEventListener("scroll", () => {
        let currentSection = activeNavCurrent;

        scrollSections.forEach(section => {
            const top = section.offsetTop - 150;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                currentSection = section.id;
            }
        });

        if (currentSection !== activeNavCurrent) {
            activeNavCurrent = currentSection;

            scrollNavLinks.forEach(link => {
                const href = link.getAttribute("href");
                if (href && href.startsWith("#")) {
                    link.classList.toggle("active", href === "#" + activeNavCurrent);
                }
            });
        }
    });
}
/*==========================================
End
==========================================*/
/* ==========================================================================
   METHOD CHILD DEVELOPMENT CENTER — SCRIPT
   1. Sticky header shadow on scroll
   2. Mobile navigation toggle
   3. Smooth-scroll for in-page anchors
   4. Scroll reveal (IntersectionObserver)
   5. Animated statistic counters
   6. Button ripple micro-interaction
   7. Back-to-top button
   8. Newsletter form (demo submit handling)
   9. Footer year
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setFooterYear();
    initHeaderScroll();
    initMobileNav();
    initSmoothAnchors();
    initScrollReveal();
    initCounters();
    initButtonRipples();
    initBackToTop();
    initNewsletterForm();
    initGalleryLightbox();
    initContactCopyActions();
    initLiveStatusIndicator();
  }

  /* ---------------------------------------------------------------- */
  /* Footer year                                                       */
  /* ---------------------------------------------------------------- */
  function setFooterYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------- */
  /* Header shadow on scroll                                           */
  /* ---------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    var toggleClass = function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };

    toggleClass();
    window.addEventListener("scroll", toggleClass, { passive: true });
  }

  /* ---------------------------------------------------------------- */
  /* Mobile navigation                                                  */
  /* ---------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      var isClickInside = nav.contains(event.target) || toggle.contains(event.target);
      if (!isClickInside && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Smooth scroll for in-page anchors (native CSS handles most, this  */
  /* ensures graceful behaviour + accounts for sticky header offset)   */
  /* ---------------------------------------------------------------- */
  function initSmoothAnchors() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener("click", function (event) {
        var targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        var target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        var headerEl = document.getElementById("siteHeader") || document.querySelector(".header");
        var headerOffset = headerEl ? headerEl.offsetHeight : 80;
        var elementPosition = target.getBoundingClientRect().top + window.scrollY;
        var offsetPosition = elementPosition - headerOffset + 1;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Scroll reveal animations                                           */
  /* ---------------------------------------------------------------- */
  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    var revealItem = function (el) {
      var delay = el.getAttribute("data-reveal-delay");
      if (delay) {
        el.style.transitionDelay = delay + "ms";
      }
      el.classList.add("is-visible");
    };

    if (!("IntersectionObserver" in window)) {
      items.forEach(revealItem);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealItem(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });

    window.setTimeout(function () {
      items.forEach(function (el) {
        if (!el.classList.contains("is-visible")) {
          revealItem(el);
        }
      });
    }, 250);
  }

  /* ---------------------------------------------------------------- */
  /* Animated statistic counters                                        */
  /* ---------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var animate = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1800;
      var startTime = null;

      var step = function (timestamp) {
        if (startTime === null) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
        var current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      };

      window.requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------- */
  /* Button ripple micro-interaction                                    */
  /* ---------------------------------------------------------------- */
  function initButtonRipples() {
    var buttons = document.querySelectorAll(".btn");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        var rect = btn.getBoundingClientRect();
        var ripple = document.createElement("span");
        var size = Math.max(rect.width, rect.height);

        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (event.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (event.clientY - rect.top - size / 2) + "px";

        btn.appendChild(ripple);

        window.setTimeout(function () {
          ripple.remove();
        }, 700);
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Back to top button                                                 */
  /* ---------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;

    var toggleVisibility = function () {
      if (window.scrollY > 640) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Newsletter form (front-end only demo handling)                     */
  /* ---------------------------------------------------------------- */
  function initNewsletterForm() {
    var form = document.getElementById("newsletterForm");
    var note = document.getElementById("newsletterNote");
    if (!form || !note) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = document.getElementById("newsletterEmail");
      var email = input ? input.value.trim() : "";
      var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        note.textContent = "Please enter a valid email address.";
        note.style.color = "var(--accent-red)";
        return;
      }

      note.textContent = "Thanks for subscribing! Watch your inbox for updates.";
      note.style.color = "var(--primary-green-light)";
      form.reset();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Gallery Lightbox Modal                                            */
  /* ---------------------------------------------------------------- */
  function initGalleryLightbox() {
    var lightbox = document.getElementById("gallery-lightbox");
    var galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
    if (!lightbox || !galleryItems.length) return;

    var backdrop = lightbox.querySelector(".lightbox-backdrop");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-prev");
    var nextBtn = lightbox.querySelector(".lightbox-next");
    var lightboxImg = lightbox.querySelector(".lightbox-img");
    var lightboxCaption = lightbox.querySelector(".lightbox-caption");
    var currentIndex = -1;
    var lastActiveTrigger = null;

    function showImage(index) {
      if (index < 0) index = galleryItems.length - 1;
      if (index >= galleryItems.length) index = 0;
      currentIndex = index;

      var item = galleryItems[currentIndex];
      var img = item.querySelector("img");
      var caption = item.querySelector(".gallery-caption");
      if (!img) return;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || (caption ? caption.textContent.trim() : "Full View Photo");
      if (lightboxCaption) {
        lightboxCaption.textContent = caption ? caption.textContent.trim() : "";
      }
    }

    function openLightbox(index) {
      lastActiveTrigger = galleryItems[index];
      showImage(index);
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      if (!lightbox.classList.contains("active")) return;
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      if (lightboxImg) lightboxImg.src = "";
      if (lastActiveTrigger) {
        lastActiveTrigger.focus();
        lastActiveTrigger = null;
      }
    }

    function prevImage() {
      showImage(currentIndex - 1);
    }

    function nextImage() {
      showImage(currentIndex + 1);
    }

    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        openLightbox(index);
      });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeLightbox();
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", closeLightbox);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        prevImage();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        nextImage();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Contact Card One-Click Copy Actions                              */
  /* ---------------------------------------------------------------- */
  function initContactCopyActions() {
    var copyButtons = document.querySelectorAll(".copy-btn");
    var announcer = document.getElementById("copy-announcement");
    if (!copyButtons.length) return;

    copyButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var textToCopy = btn.getAttribute("data-copy");
        if (!textToCopy) return;

        var originalHTML = btn.innerHTML;

        function setSuccess() {
          btn.classList.add("copied");
          btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> <span class="btn-text">Copied!</span>';
          if (announcer) {
            announcer.textContent = "Copied " + textToCopy + " to clipboard";
          }
          setTimeout(function () {
            btn.classList.remove("copied");
            btn.innerHTML = originalHTML;
          }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(setSuccess).catch(function () {
            fallbackCopy(textToCopy, setSuccess);
          });
        } else {
          fallbackCopy(textToCopy, setSuccess);
        }
      });
    });

    function fallbackCopy(text, callback) {
      var tempInput = document.createElement("textarea");
      tempInput.value = text;
      tempInput.style.position = "fixed";
      tempInput.style.opacity = "0";
      document.body.appendChild(tempInput);
      tempInput.focus();
      tempInput.select();
      try {
        document.execCommand("copy");
        callback();
      } catch (err) {
        console.warn("Unable to copy to clipboard", err);
      }
      document.body.removeChild(tempInput);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Real-time Raleigh ET Live Open/Closed Status Indicator           */
  /* ---------------------------------------------------------------- */
  function initLiveStatusIndicator() {
    var pill = document.getElementById("center-live-status");
    if (!pill) return;

    function updateStatus() {
      try {
        var now = new Date();
        var raleighStr = now.toLocaleString("en-US", { timeZone: "America/New_York" });
        var raleighDate = new Date(raleighStr);
        var day = raleighDate.getDay(); // 0 is Sun, 6 is Sat
        var hour = raleighDate.getHours();
        var mins = raleighDate.getMinutes();
        var timeVal = hour + mins / 60;

        // Open Mon–Fri, 7:00 AM to 6:00 PM (7.0 <= timeVal < 18.0)
        var isOpen = day >= 1 && day <= 5 && timeVal >= 7.0 && timeVal < 18.0;
        var statusText = pill.querySelector(".status-text");

        if (!statusText) return;

        if (isOpen) {
          pill.classList.remove("closed");
          pill.classList.add("open");
          statusText.innerHTML = "Open Now &bull; Closes 6:00 PM";
        } else {
          pill.classList.remove("open");
          pill.classList.add("closed");
          if (day === 5 && timeVal >= 18.0) {
            statusText.innerHTML = "Closed &bull; Opens Mon 7:00 AM";
          } else if (day === 6) {
            statusText.innerHTML = "Closed &bull; Opens Mon 7:00 AM";
          } else if (day === 0) {
            statusText.innerHTML = "Closed &bull; Opens Tomorrow 7:00 AM";
          } else if (timeVal < 7.0) {
            statusText.innerHTML = "Closed &bull; Opens Today 7:00 AM";
          } else {
            statusText.innerHTML = "Closed &bull; Opens Tomorrow 7:00 AM";
          }
        }
      } catch (e) {
        // Fallback default in HTML is already graceful
      }
    }

    updateStatus();
    setInterval(updateStatus, 60000);
  }

})();
