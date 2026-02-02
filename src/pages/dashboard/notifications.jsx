import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Notifications() {
  const scrollContainerRef = useRef(null);
  const ceoCardRef = useRef(null);
  const deptHeadRefs = useRef([]);
  const teamMemberRefs = useRef([]);
  const lineRefs = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const organizationStructure = {
    ceo: {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Visionary leader with 15+ years in tech innovation",
      email: "sarah.chen@company.com",
      color: "from-purple-600 to-pink-600"
    },
    departments: [
      {
        head: {
          name: "Michael Ross",
          role: "Chief Technology Officer",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          bio: "Leading technical innovation and infrastructure",
          email: "michael.ross@company.com",
          color: "from-blue-600 to-cyan-600"
        },
        team: [
          {
            name: "Alex Johnson",
            role: "Senior Developer",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
            email: "alex.j@company.com",
            color: "from-blue-600 to-cyan-600"
          },
          {
            name: "Maria Garcia",
            role: "DevOps Engineer",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
            email: "maria.g@company.com",
            color: "from-blue-600 to-cyan-600"
          }
        ]
      },
      {
        head: {
          name: "Emily Zhang",
          role: "Head of Design",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
          bio: "Crafting beautiful and intuitive experiences",
          email: "emily.zhang@company.com",
          color: "from-orange-600 to-red-600"
        },
        team: [
          {
            name: "Sophie Brown",
            role: "UI Designer",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
            email: "sophie.b@company.com",
            color: "from-orange-600 to-red-600"
          },
          {
            name: "Lucas Kim",
            role: "UX Researcher",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
            email: "lucas.k@company.com",
            color: "from-orange-600 to-red-600"
          }
        ]
      },
      {
        head: {
          name: "David Kumar",
          role: "Head of Product",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
          bio: "Building products that users love",
          email: "david.kumar@company.com",
          color: "from-green-600 to-emerald-600"
        },
        team: [
          {
            name: "Emma Wilson",
            role: "Product Manager",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
            email: "emma.w@company.com",
            color: "from-green-600 to-emerald-600"
          },
          {
            name: "Ryan Chen",
            role: "Product Analyst",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
            email: "ryan.c@company.com",
            color: "from-green-600 to-emerald-600"
          }
        ]
      },
      {
        head: {
          name: "Lisa Anderson",
          role: "Marketing Director",
          image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
          bio: "Building impactful brands and campaigns",
          email: "lisa.anderson@company.com",
          color: "from-indigo-600 to-purple-600"
        },
        team: [
          {
            name: "Nina Patel",
            role: "Content Strategist",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
            email: "nina.p@company.com",
            color: "from-indigo-600 to-purple-600"
          },
          {
            name: "Tom Harris",
            role: "Social Media Manager",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
            email: "tom.h@company.com",
            color: "from-indigo-600 to-purple-600"
          }
        ]
      }
    ]
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // GSAP Initial Animation
  useEffect(() => {
    if (hasAnimated) return;

    const tl = gsap.timeline({
      onComplete: () => setHasAnimated(true)
    });

    // Animate CEO card
    tl.from(ceoCardRef.current, {
      opacity: 0,
      y: -50,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Animate connecting lines
    tl.from(lineRefs.current[0], {
      scaleY: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.3");

    tl.from(lineRefs.current[1], {
      scaleX: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");

    // Animate department heads
    deptHeadRefs.current.forEach((ref, index) => {
      if (ref) {
        tl.from(ref, {
          opacity: 0,
          y: -30,
          scale: 0.9,
          duration: 0.5,
          ease: "back.out(1.5)"
        }, `-=${0.4 - index * 0.1}`);
      }
    });

    // Animate connecting lines to team members
    lineRefs.current.slice(2, 6).forEach((ref, index) => {
      if (ref) {
        tl.from(ref, {
          scaleY: 0,
          duration: 0.3,
          ease: "power2.out"
        }, `-=${0.4 - index * 0.05}`);
      }
    });

    // Animate team members
    teamMemberRefs.current.forEach((ref, index) => {
      if (ref) {
        tl.from(ref, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.4,
          ease: "back.out(1.3)"
        }, `-=${0.5 - index * 0.03}`);
      }
    });

    return () => {
      tl.kill();
    };
  }, [hasAnimated]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const MemberCard = ({ member, isCEO = false, isDeptHead = false, cardRef }) => {
    const localCardRef = useRef(null);

    useEffect(() => {
      const card = localCardRef.current;
      if (!card) return;

      // Hover animation with GSAP
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    return (
      <div ref={cardRef} className="w-72 flex-shrink-0">
        <div 
          ref={localCardRef}
          className="relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 h-full"
        >
          {/* Gradient border on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-2xl`}></div>
          
          {/* Image Section */}
          <div className="relative h-56 overflow-hidden bg-gray-100">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              draggable="false"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="p-5 space-y-3">
            {/* Name & Role */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className={`text-sm font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                {member.role}
              </p>
            </div>

            {/* Bio */}
            {member.bio && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            )}

            {/* Email */}
            {member.email && (
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{member.email}</span>
              </div>
            )}

            {/* Position Badge */}
            {isCEO && (
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${member.color}`}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                CEO
              </div>
            )}
            {isDeptHead && (
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${member.color}`}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                DEPT HEAD
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Arrow = ({ lineRef, direction = "down", color = "gray-400" }) => {
    if (direction === "down") {
      return (
        <div ref={lineRef} className="flex flex-col items-center origin-top">
          <div className={`w-0.5 h-12 bg-${color}`}></div>
          <svg className={`w-6 h-6 text-${color}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414l-6.293 6.293a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z" clipRule="evenodd" transform="rotate(180 10 10)" />
          </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto my-20 flex max-w-screen-xl flex-col gap-8">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-6 border-b border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h4" color="blue-gray" className="font-bold">
                Organization Structure
              </Typography>
              <Typography variant="small" color="gray" className="mt-2 font-normal">
                Our leadership team and department hierarchy
              </Typography>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Leadership</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Design</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Product</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span>Marketing</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <div 
            ref={scrollContainerRef}
            className={`overflow-x-auto overflow-y-hidden scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} pb-4`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              scrollBehavior: isDragging ? 'auto' : 'smooth'
            }}
          >
            <div className="inline-flex flex-col gap-0 min-w-max px-8">
              {/* CEO Level */}
              <div className="flex justify-center mb-4">
                <MemberCard 
                  member={organizationStructure.ceo} 
                  isCEO={true} 
                  cardRef={ceoCardRef}
                />
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <Arrow lineRef={el => lineRefs.current[0] = el} direction="down" color="purple-400" />
              </div>

              {/* Horizontal Line connecting to all departments */}
              <div className="flex justify-center my-4">
                <div 
                  ref={el => lineRefs.current[1] = el}
                  className="w-full max-w-6xl h-0.5 bg-gray-300 relative origin-left"
                >
                  {/* Vertical lines down to each department */}
                  {organizationStructure.departments.map((_, index) => (
                    <div
                      key={index}
                      ref={el => lineRefs.current[2 + index] = el}
                      className="absolute top-0 w-0.5 h-12 bg-gray-300 origin-top"
                      style={{
                        left: `${(100 / (organizationStructure.departments.length + 1)) * (index + 1)}%`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414l-6.293 6.293a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z" clipRule="evenodd" transform="rotate(180 10 10)" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Heads Level */}
              <div className="flex gap-8 justify-center mt-8 mb-4">
                {organizationStructure.departments.map((dept, index) => (
                  <MemberCard 
                    key={index} 
                    member={dept.head} 
                    isDeptHead={true}
                    cardRef={el => deptHeadRefs.current[index] = el}
                  />
                ))}
              </div>

              {/* Arrows Down to Team Members */}
              <div className="flex gap-8 justify-center">
                {organizationStructure.departments.map((_, index) => (
                  <div key={index} className="w-72 flex justify-center">
                    <Arrow direction="down" color="gray-400" />
                  </div>
                ))}
              </div>

              {/* Team Members Level */}
              <div className="flex gap-8 justify-center mt-4">
                {organizationStructure.departments.map((dept, deptIndex) => (
                  <div key={deptIndex} className="flex gap-4">
                    {dept.team.map((member, memberIndex) => (
                      <MemberCard 
                        key={memberIndex} 
                        member={member}
                        cardRef={el => teamMemberRefs.current[deptIndex * 2 + memberIndex] = el}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instruction */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="small" color="gray" className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Use mouse wheel to scroll horizontally or click and drag to explore the organization
            </Typography>
          </div>
        </CardBody>
      </Card>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Notifications;