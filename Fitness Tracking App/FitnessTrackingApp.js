document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form');
    const goalsForm = document.getElementById('goals-form');
    const workoutList = document.getElementById('workout-list');
    const goalDurationInput = document.getElementById('goal-duration');
    
    let workouts = [];
    let fitnessGoal = null;
    
    // Load workouts and goals from localStorage
    if (localStorage.getItem('workouts')) {
        workouts = JSON.parse(localStorage.getItem('workouts'));
        renderWorkouts();
    }
    if (localStorage.getItem('fitnessGoal')) {
        fitnessGoal = JSON.parse(localStorage.getItem('fitnessGoal'));
        goalDurationInput.value = fitnessGoal;
    }

    workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const workout = document.getElementById('workout').value;
        const duration = document.getElementById('duration').value;
        const date = document.getElementById('date').value;

        const workoutData = {
            workout,
            duration: parseInt(duration),
            date
        };
        
        workouts.push(workoutData);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        
        renderWorkouts();
        workoutForm.reset();
    });

    goalsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fitnessGoal = parseInt(goalDurationInput.value);
        localStorage.setItem('fitnessGoal', JSON.stringify(fitnessGoal));
        alert('Goal set successfully!');
    });

    function renderWorkouts() {
        workoutList.innerHTML = '';
        workouts.forEach((workout, index) => {
            const workoutItem = document.createElement('li');
            workoutItem.textContent = `${workout.date}: ${workout.workout} for ${workout.duration} minutes`;
            workoutList.appendChild(workoutItem);
        });
    }
});
