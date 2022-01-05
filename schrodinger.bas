PROGRAM tdse
! motion of a wavepacket incident on a potential
DIM Re(0:1100),Im(0:1100),Imold(0:1100)
CALL parameters(x0,k0,width,V0,a,xmin,xmax,n,dx,dt)
CALL initial_packet(Re(),Im(),x0,k0,width,xmin,n,dx,dt)
CALL set_up_windows(xmin,xmax,V0,#1,#2,#3,#4)
CALL draw_potential(V0,a,xmin,xmax,#4)
DO
    CALL evolve(Re(),Im(),Imold(),t,V0,a,dx,dx2,dt,xmin,n)
    CALL plots(Re(),Im(),Imold(),t,xmin,n,dx,#1,#2,#3,#4)
LOOP until key input
END
 
SUB parameters(x0,k0,width,V0,a,xmin,xmax,n,dx,dx2,dt)
    LET x0 = -15
    LET width = 1
    LET k0 = 2
    LET xmax = 20
    LET xmin= -xmax
    LET V0 = 2
    LET a = 1
    LET dx = 0.4
    LET dx2 = dx*dx
    LET n = (xmax - xmin)/dx
    LET dt = 0.1
END SUB
 
SUB initial_packet(Re(),Im(),x0,k0,width,xmin,n,dx,dt)
    ! initial Gaussian wavepacket
    LET delta2 = width*width
    LET A = (2*pi*delta2)^(-0.25)
    LET b = 0.5*k0*dt
    FOR i = 1 to n
        LET x = xmin + (i-1)*dx
        LET arg = 0.25*(x - x0)^2/delta2
        LET e = exp(-arg)
        LET Re(i) = A*cos(k0*(x - x0))*e
        LET Im(i) = A*sin(k0*(x - x0 - 0.5*b))*e
    NEXT i
END SUB
 
SUB set_up_windows(xmin,xmax,V0,#1,#2,#3,#4)
    OPEN #1: screen 0,1,0.75,1.0
    SET WINDOW xmin,xmax,-0.1,0.5
    PLOT LINES: xmin,0;xmax,0
    OPEN #2: screen 0,1,0.5,0.75
    SET WINDOW xmin,xmax,-1,1
    PLOT LINES: xmin,0;xmax,0
    OPEN #3: screen 0,1,0.25,0.5
    SET WINDOW xmin,xmax,-1,1
    PLOT LINES: xmin,0;xmax,0
    OPEN #4: screen 0,1,0,0.22
    SET WINDOW xmin,xmax,-V0,V0
END SUB
 
SUB draw_potential(V0,a,xmin,xmax,#4)
    DECLARE DEF V
    WINDOW #4
    SET COLOR "red"
    PLOT LINES: xmin,0;a,0;a,0;a,V0;a,V0;xmax,V0
    SET COLOR "black/white"
    PRINT "total probability = ";
END SUB
 
SUB plots(Re(),Im(),Imold(),t,xmin,n,dx,#1,#2,#3,#4)
    WINDOW #2
    CLEAR
    PLOT LINES: xmin,0;xmax,0
    FOR i = 1 to n
        LET x = xmin + (i - 1)*dx
        PLOT x,Im(i);
    NEXT i
    WINDOW #1
    CLEAR
    PLOT LINES: xmin,0;xmax,0
    LET Psum = 0
    FOR i = 1 to n
        LET x = xmin + (i - 1)*dx
        LET P = Re(i)*Re(i) + Im(i)*Imold(i)
        LET Psum = Psum + P*dx
        PLOT x,P;
    NEXT i
    WINDOW #4
    SET CURSOR 1,20
    PRINT "        ";
    SET CURSOR 1,20
    PRINT Psum
END SUB
 
SUB evolve(Re(),Im(),Imold(),t,V0,a,dx,dx2,dt,xmin,n)
  DECLARE DEF V
  FOR i = 1 to n
    LET x = xmin + (i-1)*dx
    LET HIm = V(x,V0,a)*Im(i) -0.5*(Im(i+1) -2*Im(i) +Im(i-1))/dx2
    ! real part defined at multiples of dt
    LET Re(i) = Re(i) + HIm*dt
  NEXT i
  FOR i = 1 to n
    LET x = xmin + (i-1)*dx
    !dt/2 earlier than real part
    LET Imold(i) = Im(i)
    LET HRe = V(x,V0,a)*Re(i) -0.5*(Re(i+1) - 2*Re(i) +Re(i-1)/dx2
    ! dt/2 later than real part
    LET Im(i) = Im(i) - HRe*dt
  NEXT i
  LET t = t + dt        ! time of real part
END SUB
 
FUNCTION V(x,V0,a)
    ! step potential
    IF x > a then
        LET V = V0
    ELSE
        LET V = 0
    END IF
END DEF