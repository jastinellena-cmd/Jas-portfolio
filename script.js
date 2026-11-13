
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");

  // Automatically update the copyright year.
  year.textContent = new Date().getFullYear();

  // Mobile navigation menu.
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  // Close the mobile menu after selecting a section.
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Toggle between dark and light themes.
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");

    themeToggle.textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  });

  // Reveal sections when they enter the screen.
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Highlight the navigation link for the current section.
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;

            navItems.forEach((link) => {
              const isActive = link.getAttribute("href") === `#${sectionId}`;
              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Show the back-to-top button after scrolling.
  function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Filter projects by category.
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      projectCards.forEach((card) => {
        const matches =
          filter === "all" || card.dataset.category === filter;

        card.hidden = !matches;
      });
    });
  });

  // Project details dialog.
  const projectDialog = document.getElementById("projectDialog");
  const dialogClose = document.getElementById("dialogClose");
  const dialogType = document.getElementById("dialogType");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogDescription = document.getElementById("dialogDescription");
  const dialogTags = document.getElementById("dialogTags");

  const projectDetails = {
    student: {
      type: "DATABASE SYSTEM",
      title: "Student Information System",
      description:
        "A student information system concept designed to organize student profiles, academic records, and related information. Add your screenshots and database features as your project develops.",
      tags: ["Database", "SQL", "Student Records"]
    },
    clinic: {
      type: "WEB APPLICATION",
      title: "Clinic Appointment System",
      description:
        "A clinic appointment system concept for managing appointment schedules and patient information. Add the tools, functions, and screenshots from your actual implementation.",
      tags: ["Web Development", "Database", "Appointments"]
    },
    network: {
      type: "NETWORKING PROJECT",
      title: "Network Topology",
      description:
        "A networking project using Cisco Packet Tracer to demonstrate network devices, IP addressing, LAN and WAN connections, VLANs, and routing.",
      tags: ["Cisco Packet Tracer", "VLAN", "Routing"]
    }
  };

  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectDetails[button.dataset.project];

      if (!project) return;

      dialogType.textContent = project.type;
      dialogTitle.textContent = project.title;
      dialogDescription.textContent = project.description;
      dialogTags.replaceChildren();

      project.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        dialogTags.appendChild(tagElement);
      });

      projectDialog.showModal();
    });
  });

  dialogClose.addEventListener("click", () => {
    projectDialog.close();
  });

  // Close the dialog when clicking outside its content.
  projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) {
      projectDialog.close();
    }
  });
});
